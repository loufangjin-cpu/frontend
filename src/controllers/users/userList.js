// 抽离前端代码，并渲染成模板
import indexTpl from '../../views/index.art'
import userTpl from '../../views/userList.art'
import userShowTpl from '../../views/userShow.art'
import paging from '../../public/page'
import Page from '../../dataShare/pageData'
import router from '../../router/index'
import { userSave } from './addUser'
import { userList } from '../../models/userList'
import { auth } from '../../models/auth'
import { remove } from '../../public/remove'

const pageUserList = Page.pageUserList

let state = { list: [] }


// 获取用户列表
const getList = async () => {
    let res = await userList()
    state.list = res.data
    // 分页
    paging(res.data)
    // 用户列表渲染
    showUserList(Page.curPage)
}


// 用户列表渲染页面
const showUserList = (pageNum) => {
    let start = (pageNum - 1) * pageUserList
    $('#userShow').html(userShowTpl({
        // 每页的渲染内容数量
        data: state.list.slice(start, start + pageUserList)
    }))
}

// 观察者模式
const pageWatcher = () => {
    // 页码
    $('body').on('changeCurPage', (e, index) => {
        showUserList(index)
    })
    // 注册
    $('body').on('addUser', (e) => {
        getList()
    })
}

// 主页渲染
const Home = (router) => {
    // 封装
    const all = async (res, next) => {

        // 填充用户列表
        next()
        res.render(userTpl({}))

        // 添加弹框事件
        $('#addUser').on('click', userSave)

        // 获取用户列表数据
        await getList()

        // 点击绑定事件
        remove({
            $box: $('#userShow'),
            state,
            url: '/api/users/delete',
            getList
        })

        // 订阅页码点击事件
        pageWatcher()
    }

    return async (req, res, next) => {
        let result = await auth()
        if (result.ret) {
            all(res, next)
        } else {
            router.go('/login')
        }
    }
}



export default Home