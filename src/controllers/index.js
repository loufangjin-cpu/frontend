// 抽离模板
import indexTpl from '../views/index.art'
import loginTol from '../views/login.art'
import userList from '../views/userList.art'

const htmlIndex = indexTpl({})
const htmlLogin = loginTol({})

// 跳转home主页事件
const loginGo = (router) => {
    return (e) => {
        // 阻止提交表单
        e.preventDefault()
        router.go('/home')
    }
}
// 点击保存事件
const userSave = () => {
    const $userClose = $('#userClose')
    // 提交表单
    $('#userForm').serialize()//通过序列化表单值创建 URL 编码文本字符串
    $userClose.click()
}

const Login = (router) => {
    return (req, res, next) => {
        res.render(htmlLogin)
        // 将跳转home主页的方法绑定在submit上
        $('#login').on('submit', loginGo(router))
    }
}
const Home = (router) => {
    return (req, res, next) => {
        res.render(htmlIndex)
        $('#userList').html(userList())
        $('#userSave').on('click', userSave)
    }
}



export {
    Login,
    Home
}