import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

const useMenus = () => {
  const location = useLocation()
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  // 路由改变更新菜单数据
  useEffect(() => {
    selectedMenu(location.pathname)
  }, [location.pathname])
  const selectedMenu = (pathname: string) => {
    const arr = pathname.split('/')
    const list: string[] = []
    if (arr.length) {
      arr.reduce((prev, current) => {
        const str = prev + '/' + current
        list.push(str)
        return str
      })
    }
    setOpenKeys((value) => value.concat(list))
    setSelectedKeys(list)
  }
  // 展开/收缩菜单
  const onOpenChange = (openKeys: string[]) => {
    setOpenKeys(openKeys)
  }

  return { openKeys, selectedKeys, onOpenChange }
}

export default useMenus
