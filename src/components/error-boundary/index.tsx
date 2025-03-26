import { Component } from 'react'
import { Button, Empty } from 'antd'

type ErrorBoundaryStates = {
  hasError: boolean
}

/**
 * 错误边界处理
 *
 * @export
 * @class ErrorBoundary
 * @extends {Component<any, ErrorBoundaryStates>}
 */
export class ErrorBoundary extends Component<any, ErrorBoundaryStates> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  // ‌getDerivedStateFromError‌是React中一个静态方法，用于在类组件中捕获子组件的错误，
  // 并据此更新状态。当子组件抛出错误时，此方法会被调用，并返回一个新的状态对象，通常用于在UI中显示错误信息
  static getDerivedStateFromError() {
    return { hasError: true }
  }

  // ‌componentDidCatch‌是React 16中引入的一个生命周期方法，用于捕获组件树中子组件的错误。
  // 当组件树中的任何子组件抛出错误时，这个方法会被调用，从而允许开发者处理这些错误，例如显示错误信息或记录错误日志
  componentDidCatch(error: any, info: any) {
    console.log('error', error, info)
  }

  refresh = () => {
    location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <Empty
          style={{ height: '100%' }}
          image={Empty.PRESENTED_IMAGE_DEFAULT}
          description="程序出错了，点击刷新重试"
        >
          <Button style={{ width: 160 }} type="primary" shape="round" onClick={this.refresh}>
            按钮
          </Button>
        </Empty>
      )
    }
    return this.props.children
  }
}
