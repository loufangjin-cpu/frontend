// 抽离前端代码，并渲染成模板
const axios = require('axios')
// const $ = require('jquery')
import indexTpl from '../views/index.art'
import loginTpl from '../views/login.art'
import userTpl from '../views/userList.art'
import userShowTpl from '../views/userShow.art'
import userPage from '../views/userPage.art'
import router from '../router/index'

const htmlIndex = indexTpl({})
const htmlLogin = loginTpl({})

let pageUserList = 10 //每页显示数据数量
let curPage = 1 //当前页码，默认为1
let usersData = []

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

// 点击保存事件
const userSave = () => {
    const $userClose = $('#userClose')
    // 提交表单
    const data = $('#userForm').serialize()//serialize通过序列化表单值创建 URL 编码文本字符串
    // 把注册用户信息上传到数据库
    $.ajax({
        url: '/api/users',
        type: 'post',
        data,
        success(res) {
            getUserList()
        }
    })
    $userClose.click()
}

// 用户列表分页事件
const paging = (data) => {
    let totalUsers = data.length
    let totalPageNum = Math.ceil(totalUsers / pageUserList)
    let pageArray = new Array(totalPageNum)
    $('#userPaging').html(userPage({
        data: pageArray
    }))
    setPageActive(curPage)
}


// 获取用户列表
const getUserList = () => {
    return $.ajax({
        url: '/api/users',
        success(res) {
            usersData = res.data
            // 分页
            paging(res.data)
            // 用户列表渲染
            showUserList(curPage)
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

// 页码高亮事件
const setPageActive = (index) => {
    $('#userPaging #userPage li:not(:first-child,:last-child)')
        .eq(index - 1)
        .addClass('active')
        .siblings()
        .removeClass('active')
}

// 登陆渲染
const Login = (router) => {
    return (req, res, next) => {
        res.render(htmlLogin)
        // 将跳转home主页的方法绑定在submit上
        $('#login').on('submit', loginGo(router))
    }
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

            // 删除用户事件
            $('#userShow').on('click', '.btn02', function () {
                $.ajax({
                    url: 'api/users/delete',
                    type: 'delete',
                    data: {
                        id: $(this).data('id')
                    },
                    success() {
                        // 删除后重新刷新用户列表数据
                        getUserList()
                        // 判断是否删光当页数据并向前翻页
                        const isLastPage = Math.ceil(usersData.length / pageUserList) === curPage
                        const restOne = usersData.length % pageUserList === 1
                        const notPageFirst = curPage !== 0
                        if (isLastPage && restOne && notPageFirst) {
                            curPage--
                        }
                    }
                })
            })

            // 页码点击事件
            $('#userPaging').on('click', '#userPage li:not(:first-child,:last-child)', function () {
                // 给点击的页码高亮，并取消其他同级li高亮
                const index = $(this).index()
                // 根据页码索引显示不同的内容
                showUserList(index)
                curPage = index
                setPageActive(curPage)
            })
            // 加减页事件
            $('#userPaging').on('click', '#userPage li:first-child', function () {
                if (curPage > 1) {
                    curPage--
                    showUserList(curPage)
                    setPageActive(curPage)
                }
            })
            $('#userPaging').on('click', '#userPage li:last-child', function () {
                if (curPage < Math.ceil(usersData.length / pageUserList)) {
                    curPage++
                    showUserList(curPage)
                    setPageActive(curPage)
                }
            })

            // 获取用户列表数据
            getUserList()

            // 点击添加事件
            $('#userSave').on('click', userSave)

            // 重新点击添加对话框清空输入框
            $('#addUser').on('click', clearInput)

            // 退出登录事件
            $('#userSignout').on('click', () => {
                $.ajax({
                    url: '/api/users/signout',
                    dataType: 'json',
                    success(res) {
                        if (res.ret) {
                            location.reload()
                        }
                    }
                })
            })
        }

        $.ajax({
            url: '/api/users/isAuth',
            dataType: 'json',
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



export {
    Login,
    Home
}