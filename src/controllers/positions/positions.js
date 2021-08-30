import positionsListTpl from '../../views/positionsList.art'
// import positionsAdd from '../../views/positionsAdd.art'
import positionsShow from '../../views/positionsShow.art'
import { positionsList } from '../../models/positionsList'
// import { positionsUsers } from '../../models/positionsAdd'
import paging from '../../public/page'
import Page from '../../dataShare/pageData'
import { remove } from '../../public/remove'
import { auth } from '../../models/auth'
import { addPosition } from '../positions/addPosition'
import { updatePosition } from './updatePosition'

let state = { list: [] }
const pageUserList = Page.pageUserList


// 用户列表渲染页面
const showUserList = (pageNum) => {
    let start = (pageNum - 1) * pageUserList
    // 渲染数据列表
    $('#positionShow').html(positionsShow({
        // 每页的渲染内容数量
        data: state.list.slice(start, start + pageUserList)
    }))
}

// 获取用户列表
 const getList = async () => {
    // 渲染数据列表
    const list = await positionsList()
    state.list = list
    // 分页
    paging(state.list)
    // 用户列表渲染
    showUserList(Page.curPage)
}

// 观察者模式
const pageWatcher = () => {
    // 页码
    $('body').off('changeCurPage').on('changeCurPage', (e, index) => {
        showUserList(index)
    })
    // 注册
    $('body').off('addPosition').on('addPosition', (e) => {
        getList()
    })
}

const Position = (router) => {
    return async (req, res, next) => {
      // let result = await auth()
      // if (result.ret) {
      //     next()
      //     // 渲染页面模板
      //     res.render(positionsListTpl())

      //     // 获取用户列表数据
      //     getList()

      //     // 观察者模式
      //     pageWatcher()

      //     // 添加职位事件
      //     addPosition()

      //     // 删除事件
      //     remove({
      //         $box: $('#positionShow'),
      //         state,
      //         url: '/api/positions/delete',
      //         getList
      //     })

      //     // 编辑事件
      //     $('#positionShow').off('click', '.positions-update').on('click', '.positions-update', function () {
      //         // 编辑职位
      //         updatePosition($(this).data('id'))
      //     })
      // } else {
      //     router.go('/login')
      // }
      // 渲染页面模板
      res.render(positionsListTpl())

      // 获取用户列表数据
      getList()

      // 观察者模式
      pageWatcher()

      // 添加职位事件
      addPosition()

      // 删除事件
      remove({
        $box: $('#positionShow'),
        state,
        url: '/api/positions/delete',
        getList
      })

      // 编辑事件
      $('#positionShow')
        .off('click', '.positions-update')
        .on('click', '.positions-update', function () {
          // 编辑职位
          updatePosition($(this).data('id'))
        })
    }
}


export default Position