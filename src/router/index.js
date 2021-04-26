// 路由
import SMERouter from 'sme-router'
import { Login, Home } from '../controllers'

const router = new SMERouter('root')//绑定要渲染页面的id

// 路由守卫
router.use((req) => {
    // 根据用户是否登录来判断跳转页面
    $.ajax({
        url: '/api/users/isAuth',
        dataType: 'json',
        success(result) {
            if (result.ret) {
                router.go('/home')
            } else {
                router.go('/')
            }
        }
    })
})

// 登录页面
router.route('/', Login(router))
// 主页
router.route('/home', Home(router))


export default router