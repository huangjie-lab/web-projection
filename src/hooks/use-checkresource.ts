import useAuthStore from '@/store/auth'
import { useMemo } from 'react'

const useCheckResource = (code: string) => {
  const { resources } = useAuthStore()
  return useMemo(() => !!resources[code], [code, resources])
}

export default useCheckResource
