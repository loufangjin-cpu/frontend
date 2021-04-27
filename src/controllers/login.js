import loginTpl from '../views/login.art'
const htmlLogin = loginTpl({})

// 跳转home主页事件
const loginGo = (router) => {
    return (e) => {
        // 阻止提交表单
        e.preventDefault()
        // 登录跳转home主页
        const data = $('#login').serialize()
        $.ajax({
            url: '/api/users/login',
            type: 'post',
            dataType: 'json',
            data,
            success(res) {
                if (res.ret) {
                    router.go('/home')
                }
            }
        })
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