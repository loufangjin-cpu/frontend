// 载入路由
import router from './router/index.js'
const hash = location.hash.slice(1)
console.log('//', hash)

// router.go(hash)
router.go(hash)


