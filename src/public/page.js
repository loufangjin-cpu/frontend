// 分页模板
import userPage from '../views/userPage.art'
import Page from '../dataShare/pageData'

const pageUserList = Page.pageUserList

// 用户列表分页事件
const paging = (data) => {
    let totalUsers = data.length
    let totalPageNum = Math.ceil(totalUsers / pageUserList)
    let pageArray = new Array(totalPageNum)
    $('#userPaging').html(userPage({
        data: pageArray
    }))
    setPageActive(Page.curPage)
    pageEvent(data)
}

// 页码高亮事件
const setPageActive = (index) => {
    $('#userPaging #userPage li:not(:first-child,:last-child)')
        .eq(index - 1)
        .addClass('active')
        .siblings()
        .removeClass('active')
}

const pageEvent = (data) => {
    // 页码点击事件
    $('#userPaging').off('click').on('click', '#userPage li:not(:first-child,:last-child)', function () {
        // 给点击的页码高亮，并取消其他同级li高亮
        const index = $(this).index()
        // 根据页码索引显示不同的内容
        Page.setCurPage(index)
        $('body').trigger('changeCurPage', index)
        setPageActive(index)
    })

    // 加减页事件
    $('#userPaging').on('click', '#userPage li:first-child', function () {
        if (Page.curPage > 1) {
            Page.setCurPage(Page.curPage - 1)
            $('body').trigger('changeCurPage', Page.curPage)
            setPageActive(Page.curPage)
        }
    })
    $('#userPaging').on('click', '#userPage li:last-child', function () {
        if (Page.curPage < Math.ceil(data.length / pageUserList)) {
            Page.setCurPage(Page.curPage + 1)
            $('body').trigger('changeCurPage', Page.curPage)
            setPageActive(Page.curPage)
        }
    })
}
export default paging