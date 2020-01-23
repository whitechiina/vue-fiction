
/**
 * 跳转路由或http链接
 * @param { String } route 路由值或http链接字符串
 */
import router from '@/router'
export function RouterLink (route) {
  if (!route) return
  if (typeof route === 'string' && route.indexOf('miniapp://') === 0) {
    window.wx.miniProgram.reLaunch({ url: route.replace('miniapp://', '/') })
  } else if (
    typeof route === 'string' && (route.indexOf('http') === 0 || route.indexOf('/api') === 0)
  ) {
    location.href = route
  } else {
    router.push(route)
  }
}



// 数字转万为单位
export function dealNum (num) {
  var cun = 0
  if (num > 10000) {
      cun = (num / 10000).toFixed(1) + '万'
  } else {
      cun = num
  }
  return cun
}
