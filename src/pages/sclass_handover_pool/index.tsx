import useCheckResource from '@/hooks/use-checkresource'
import { Button } from 'antd'
import { type FC } from 'react'

/**
 * 功能权限
 */
const HandoverPool: FC = () => {
  const fISclassHandoverPoolExport = useCheckResource('fISclassHandoverPoolExport')
  const fISclassHandoverPoolExport1 = useCheckResource('fISclassHandoverPoolExport1') // 没有改权限页面不展示
  return (
    <div>
      {fISclassHandoverPoolExport && <Button type="primary">导出</Button>}
      {fISclassHandoverPoolExport1 && <Button>导入</Button>}
    </div>
  )
}
export default HandoverPool
