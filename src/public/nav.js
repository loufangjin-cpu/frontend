import headerNav from '../views/headerNav.art'

const nav = () => {
    const theNav = {
        '#/home': {
            mainNav: 'Welcome',
            subNav: ''
        },
        '#/home/users': {
            mainNav: '用户管理',
            subNav: '用户列表'
        },
        '#/home/position': {
            mainNav: '职位管理',
            subNav: '职位列表'
        }
    }
    const hash = location.hash
    $('#content').before(headerNav({
        mainNav: theNav[hash]['mainNav'],
        subNav: theNav[hash]['subNav']
    }))
}

export default nav