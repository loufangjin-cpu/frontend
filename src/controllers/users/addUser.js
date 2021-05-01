import Page from '../../dataShare/pageData'
import addUserOne from '../../views/userAdd.art'
import { addUsers } from '../../models/addUser'

// 点击添加用户事件
export const userSave = () => {
    $('#addUserTwo').after(addUserOne())
    // 提交表单
    const saveBtn = async () => {
        const data = $('#userForm').serialize()//serialize通过序列化表单值创建 URL 编码文本字符串
        // 把注册用户信息上传到数据库
        let result = await addUsers(data)
        if (result.ret) {
            Page.setCurPage(1)
            $('body').trigger('addUser')
        }
        const $userClose = $('#userClose')
        $userClose.click()
    }
    // 点击添加事件
    $('#userSave').on('click', saveBtn)
}
