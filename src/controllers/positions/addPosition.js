import positionsAdd from '../../views/positionsAdd.art'
import { positionsUsers } from '../../models/positionsAdd'
import { getList } from '../positions/positions'
import Page from '../../dataShare/pageData'
export const addPosition = () => {
    // 渲染弹框
    $('#addPositionTwo').after(positionsAdd())
    $('#positionSave').off('click').on('click', async () => {
        // 添加用户
        await positionsUsers()
        // 刷新获取用户列表数据
        // await getList()
        Page.setCurPage(1)
        $('body').trigger('addPosition')
        // 关闭
        $('#positionClose').click()
    })

}