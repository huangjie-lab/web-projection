import { type CSSProperties, type FC, useEffect, useState } from 'react'
import { Spin } from 'antd'

type LoadingProps = {
  className?: string
  style?: CSSProperties
  delay?: number
}

const Loading: FC<LoadingProps> = (props) => {
  const { className, style, delay } = props
  const [visible, setVisible] = useState(() => !delay)

  useEffect(() => {
    if (!delay) {
      return
    }
    const timer = setTimeout(() => {
      setVisible(true)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [delay])

  return visible ? (
    <div
      className={className}
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }}
    >
      <Spin />
    </div>
  ) : null
}

export default Loading
