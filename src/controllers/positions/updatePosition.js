import positionsUpdateTpl from '../../views/positionsUpdate.art'
import { positionsUsers } from '../../models/positionsAdd'
// import { getList } from '../positions/positions'
import { positionsUpdate } from '../../models/positionsUpdate'
import positionsUpdateForm from '../../views/positionsUpdateForm.art'
import http from '../../http/http'
import Page from '../../dataShare/pageData'
export const updatePosition = async (id) => {

    // 渲染弹框
    $('#addPositionTwo').after(positionsUpdateTpl())

    let { result } = await http({
        url: '/api/positions/listone',
        type: 'post',
        data: {
            id
        }
    })

    $('#positionForm-update').html(positionsUpdateForm({
        data: {
            ...result
        }
    }))

    $('#positionSave-update').off('click').on('click', async () => {
        // 生成表单
        let result = await positionsUpdate()
        // 刷新获取用户列表数据
        // await getList()
        // location.reload()
        // 添加数据后渲染
            Page.setCurPage(1)
            $('body').trigger('addPosition')
        // 关闭
        $('#positionClose-update').click()

    })
}


