// 路由
import SMERouter from 'sme-router'
import { Login, Home } from '../controllers'

const router = new SMERouter('root')//绑定要渲染页面的id


// $('#root').html(html)
// 语法：$('要渲染的目标').html(渲染文件art)
// 登录
router.route('/', Login(router))
// 主页
router.route('/home', Home(router))


export default router