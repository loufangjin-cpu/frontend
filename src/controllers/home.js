// 抽离前端代码，并渲染成模板
const axios = require('axios')
// const $ = require('jquery')
import indexTpl from '../views/index.art'
import userTpl from '../views/userList.art'
import userShowTpl from '../views/userShow.art'
import paging from '../public/page'
import Page from '../dataShare/pageData'
import router from '../router/index'

const pageUserList = Page.pageUserList

const htmlIndex = indexTpl({})

let usersData = []


// 点击保存事件
const userSave = () => {
    const $userClose = $('#userClose')
    // 提交表单
    const data = $('#userForm').serialize()//serialize通过序列化表单值创建 URL 编码文本字符串
    // 把注册用户信息上传到数据库
    $.ajax({
        url: '/api/users',
        type: 'post',
        headers: {
            'X-Access-Token': localStorage.getItem('mai-token') || ''
        },
        data,
        success(res) {
            Page.setCurPage(1)
            getUserList()
        }
    })
    $userClose.click()
}


// 获取用户列表
const getUserList = () => {
    return $.ajax({
        url: '/api/users',
        headers: {
            'X-Access-Token': localStorage.getItem('mai-token') || ''
        },
        success(res) {
            usersData = res.data
            // 分页
            paging(res.data)
            // 用户列表渲染
            showUserList(Page.curPage)
        }
    })
}


// 用户列表渲染页面
const showUserList = (pageNum) => {
    let start = (pageNum - 1) * pageUserList
    $('#userShow').html(userShowTpl({
        // 每页的渲染内容数量
        data: usersData.slice(start, start + pageUserList)
    }))
}


// 清空输入框
const clearInput = () => {
    $('#password').val('')
    $('#username').val('')
}


// 点击绑定事件
const methods = () => {


    // 退出登录事件
    $('#userSignout').on('click', () => {
        localStorage.setItem('mai-token', '')
        location.reload()
    })

    // 删除用户事件
    $('#userShow').on('click', '.btn02', function () {
        $.ajax({
            url: 'api/users/delete',
            type: 'delete',
            headers: {
                'X-Access-Token': localStorage.getItem('mai-token') || ''
            },
            data: {
                id: $(this).data('id')
            },
            success() {
                // 删除后重新刷新用户列表数据
                getUserList()
                // 判断是否删光当页数据并向前翻页
                const isLastPage = Math.ceil(usersData.length / pageUserList) === Page.curPage
                const restOne = usersData.length % pageUserList === 1
                const notPageFirst = Page.curPage !== 0
                if (isLastPage && restOne && notPageFirst) {
                    Page.setCurPage(Page.curPage - 1)
                }
            }
        })
    })

    // 点击添加事件
    $('#userSave').on('click', userSave)

    // 重新点击添加对话框清空输入框
    $('#addUser').on('click', clearInput)
}

// 观察者模式-页码
const pageWatcher = () => {
    $('body').on('changeCurPage', (e, index) => {
        showUserList(index)
    })
}


// 主页渲染
const Home = (router) => {
    return (req, res, next) => {
        // 封装
        const all = (res) => {
            // 渲染首页
            res.render(htmlIndex)

            // 填充用户列表
            $('#content').html(userTpl())

            // 获取用户列表数据
            getUserList()

            // 点击绑定事件
            methods()

            // 订阅页码点击事件
            pageWatcher()
        }

        $.ajax({
            url: '/api/users/isAuth',
            dataType: 'json',
            headers: {
                'X-Access-Token': localStorage.getItem('mai-token') || ''
            },
            success(result) {
                if (result.ret) {
                    all(res)
                } else {
                    router.go('/')
                }
            }
        })

    }
}



export default Home