import indexTpl from '../views/index.art'
import { auth } from '../models/auth'
import nav from '../public/nav'
import img from '../static/mai.jpg'
import Page from '../dataShare/pageData'
import paging from '../public/page'
// 主页渲染
const Home = (router) => {

    return async (req, res, next) => {
        let result = await auth()
        if (result.ret) {
            const html = indexTpl({
                subRouter: res.subRoute(),
                img
            })
            next(html)
            nav()
            // 菜单点击事件
            const sider = $('#sidebar-menu li:not(:first-child) a')
            // 点击高亮事件
            let hash = location.hash
            sider.filter(`[href="${hash}"]`)
                .parent()
                .addClass('active')
                .siblings()
                .removeClass('active')
            // 保持当前url
            Page.setcurRoute(hash)

            // 退出登录事件
            $('#userSignout').on('click', () => {
                localStorage.setItem('mai-token', '')
                location.reload()
            })
            
        } else {
            router.go('/login')
        }
    }
}



export default Home