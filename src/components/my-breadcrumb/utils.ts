import type { MainRouteProps } from '@/pages/routes'

/**
 * 如果是 / 开头或者是 链接 的不作任何处理
 * 否则与父节点做一下合并
 *
 * @param {string} [path=''] - 路径
 * @param {string} [parentPath='/'] - 父路径
 * @returns
 */
function mergePath(path = '', parentPath = '/') {
  if (path.startsWith('/') || path.startsWith('http')) {
    return path
  }
  return `/${parentPath}/${path}`.replace(/\/\//g, '/').replace(/\/\//g, '/')
}

/**
 * 遍历生成面包屑Mao
 *
 * @export
 * @param {MainRouteProps[]} routes - 路由配置
 * 使用map结构和对象似乎效果一样
 * @returns
 */
export function getBreadcrumbMap(routes: MainRouteProps[]) {
  // const routerMap = new Map<string, MainRouteProps>();
  const routerMap: Record<string, MainRouteProps> = {}
  const flattenMenuData = (route: MainRouteProps[], parent?: MainRouteProps) => {
    route.forEach((el) => {
      const child = el.children || []
      if (child.length !== 0) {
        flattenMenuData(child, el)
      }
      const path = mergePath(el.path, parent ? parent.path : '/')
      // routerMap.set(path, el);
      routerMap[path] = el
    })
  }
  flattenMenuData(routes.filter((el) => el.path !== '*'))
  return routerMap
}

/**
 * 路径转换为List
 * /user/edit/id 转换为 ['/user','/user/edit,'/user/edit/id']
 *
 * @export
 * @param {string} [path] - 路径
 * @returns
 */
export function pathToList(path?: string) {
  if (!path || path === '/') {
    return ['/']
  }
  const list = path.split('/').filter((i) => i)
  return list.map((_, index) => `/${list.slice(0, index + 1).join('/')}`)
}
