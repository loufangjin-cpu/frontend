// 共享数据
class Page {
    constructor() {
        this.pageUserList = 10 //每页显示数据数量
        this.curPage = 1 //当前页码，默认为1
    }
    setCurPage(curPage){
        this.curPage = curPage
    }
}

export default new Page()