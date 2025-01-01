import { Component } from 'react';
import { Button, Empty } from 'antd';

type ErrorBoundaryStates = {
  hasError: boolean;
};

/**
 * 错误边界处理
 *
 * @export
 * @class ErrorBoundary
 * @extends {Component<any, ErrorBoundaryStates>}
 */
export class ErrorBoundary extends Component<any, ErrorBoundaryStates> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    console.log('error', error, info);
  }

  refresh = () => {
    location.reload();
  };

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
      );
    }
    return this.props.children;
  }
}
