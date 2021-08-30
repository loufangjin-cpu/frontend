// 路由
import GP21Router from 'gp21-router'
import Login from '../controllers/login'
import Home from '../controllers/index'
import Users from '../controllers/users/userList'
import Position from '../controllers/positions/positions'
import { auth } from '../models/auth'

const router = new GP21Router('root')//绑定要渲染页面的id

// 路由守卫
// router.use(async (req) => {
//     let result = await auth()
//     if (result.ret) {
//         router.go(req.url)
//     } else {
//         router.go('/login')
//     }
// })



// 登录页面
router.route('/login', Login(router))
// 主页
router.route('/home', Home(router))
// 用户管理
router.route('/home/users', Users(router))
// 职位管理
router.route('/home/position', Position(router))


export default router