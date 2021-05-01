import loginTpl from '../views/login.art'
import { login } from '../models/login'
const htmlLogin = loginTpl({})

// 跳转home主页事件
const loginGo = (router) => {
    return async (e) => {
        // 阻止提交表单
        e.preventDefault()
        // 登录跳转home主页
        const data = $('#login').serialize()
        let { res, jqXHR } = await login(data)
        // 获取后端发送的token
        const token = jqXHR.getResponseHeader('X-Access-Token')
        // 并将token存到本地
        localStorage.setItem('mai-token', token)
        if (res.ret) {
            router.go('/home/users')
        }
    }
}

// 登陆渲染
const Login = (router) => {
    return (req, res, next) => {
        res.render(htmlLogin)
        // 将跳转home主页的方法绑定在submit上
        $('#login').on('submit', loginGo(router))
    }
}

export default Login