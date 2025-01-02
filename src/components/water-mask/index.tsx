import useAuthStore from '@/store/auth';
import { useEffect, useRef, type FC, type ReactElement } from 'react';
/**
 * 高阶组件
 * 实现水印效果
 */
interface WaterMaskProps {
  children: ReactElement;
}
// 设置水印文本的基本配置
const defaultConfig = {
  /** 文本颜色 */
  color: '#c0c4cc',
  /** 文本透明度 */
  opacity: 0.2,
  /** 文本字体大小 */
  size: 14,
  /** 文本字体 */
  family: 'serif',
  /** 文本倾斜角度 */
  angle: -20,
  /** 一处水印所占宽度（数值越大水印密度越低） */
  width: 200,
  /** 一处水印所占高度（数值越大水印密度越低） */
  height: 160,
  /** 水印文本，暂时放到这里，一般会提取出来将其作为一个全局变量*/
  backupText: '水印文本'
};
function createBase64(maskText: string | undefined) {
  // 解构配置
  const { color, opacity, size, family, angle, width, height, backupText } = defaultConfig;
  // 创建一个画布
  const canvasEl = document.createElement('canvas');
  //设置宽高
  canvasEl.width = width;
  canvasEl.height = height;
  /**
   * 创建 context 对象
   * getContext("2d") 对象是内建的 HTML5 对象，
   * 拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法
   */
  const ctx = canvasEl.getContext('2d');
  if (ctx) {
    // 设置颜色
    ctx.fillStyle = color;
    // 设置透明度
    ctx.globalAlpha = opacity;
    //设置字体
    ctx.font = `${size}px ${family}`;
    //设置倾斜度
    ctx.rotate((Math.PI / 180) * angle);
    //设置水印文本
    ctx.fillText(maskText || backupText, 0, height / 2);
  }
  return canvasEl.toDataURL();
}

let parentEl = undefined;
let waterMaskEl: any = undefined;
//设置监听器
const observer = {
  watermarkElMutationObserver: undefined,
  parentElMutationObserver: undefined
};
const addMutationListener = (targetNode: any) => {
  const mutationCallback = (mutationList: any) => {
    //水印的防御 (防止用户手动删除水印或通过css隐藏水印)
    mutationList.forEach((mutation: any) => {
      switch (mutation.type) {
        case 'childList':
          console.log('exec');
          mutation.removedNodes.forEach((item: any) => {
            item === waterMaskEl && targetNode.appendChild(waterMaskEl);
          });
          break;
      }
    });
  };
  //创建观察器实例并传入回调
  observer.watermarkElMutationObserver = new MutationObserver(mutationCallback) as any;
  observer.parentElMutationObserver = new MutationObserver(mutationCallback) as any;
  //以上述配置 启动水印元素监听器，开始观察目标节点
  (observer.watermarkElMutationObserver as any).observe(waterMaskEl, {
    // 观察目标节点属性是否变动，默认为 true
    attributes: true,
    // 观察目标子节点是否有添加或者删除，默认为 false
    childList: true,
    // 是否拓展到观察所有后代节点，默认为 false
    subtree: true
  });
  // 启动父级容器 监听器，
  (observer.parentElMutationObserver as any).observe(targetNode, {
    attributes: true,
    childList: true,
    subtree: true
  });
};
const WaterMask: FC<WaterMaskProps> = (props) => {
  const { info } = useAuthStore();
  const init = () => {
    parentEl = document.getElementById('root') as HTMLDivElement;
    // 设置父元素定位
    parentEl.style.position = 'relative';
    // 创建水印元素
    waterMaskEl = document.createElement('div');
    waterMaskEl.className = 'water-mask';
    waterMaskEl.style.pointerEvents = 'none';
    waterMaskEl.style.position = 'absolute';
    waterMaskEl.style.top = '0';
    waterMaskEl.style.left = '0';
    const { clientWidth, clientHeight } = parentEl;
    waterMaskEl.style.width = `${clientWidth}px`;
    waterMaskEl.style.height = `${clientHeight}px`;
    waterMaskEl.style.zIndex = '99999';
    // 创建水印内容并添加到父元素中
    waterMaskEl.style.background = `url(${createBase64(info?.fullname)}) left top repeat`;
    if (!parentEl.querySelector('.water-mask')) {
      parentEl.appendChild(waterMaskEl);
    }
  };
  useEffect(() => {
    init();
  }, [init]);

  // 监听水印元素和容器元素
  // addMutationListener(parentEl);
  return props.children;
};

export default WaterMask;
