// 路由
import SMERouter from 'sme-router'
import Login from '../controllers/login'
import Home from '../controllers/home'

const router = new SMERouter('root')//绑定要渲染页面的id

// 路由守卫
router.use((req) => {
    // 根据用户是否登录来判断跳转页面
    $.ajax({
        url: '/api/users/isAuth',
        dataType: 'json',
        // 登录请求时把存在本地的token通过请求头携带 给后端验证
        headers: {
            'X-Access-Token': localStorage.getItem('mai-token') || ''
        },
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