import { removeModel } from '../models/remove'
import Page from '../dataShare/pageData'
const pageUserList = Page.pageUserList

// 删除事件
const remove = ({ $box, url, getList, state }) => {
    
    $box.on('click', '.btn02', async function () {
        length = state.list.length
        let result = await removeModel({
            url,
            id: $(this).data('id'),
            length
        })
        
        if (result.ret) {

            // 删除后重新刷新用户列表数据
            getList()
            // 判断是否删光当页数据并向前翻页
            const isLastPage = Math.ceil(length / pageUserList) === Page.curPage
            const restOne = length % pageUserList === 1
            const notPageFirst = Page.curPage !== 0
            if (isLastPage && restOne && notPageFirst) {
                Page.setCurPage(Page.curPage - 1)
            }
        }
    })
}

export {
    remove
}