import { useRef, type FC, type ReactElement } from 'react';
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
  opacity: 0.1,
  /** 文本字体大小 */
  size: 12,
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
function createBase64() {
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
    ctx.fillText(backupText, 0, height / 2);
  }
  return canvasEl.toDataURL();
}
const WaterMask: FC<WaterMaskProps> = ({ children }) => {
  const parentEl = document.getElementById('root') as HTMLDivElement;
  // 设置父元素定位
  parentEl.style.position = 'relative';
  // 创建水印元素
  const waterMaskEl = document.createElement('div');
  waterMaskEl.style.pointerEvents = 'none';
  waterMaskEl.style.position = 'absolute';
  waterMaskEl.style.top = '0';
  waterMaskEl.style.left = '0';
  const { clientWidth, clientHeight } = parentEl;
  waterMaskEl.style.width = `${clientWidth}px`;
  waterMaskEl.style.height = `${clientHeight}px`;
  waterMaskEl.style.zIndex = '99999';
  // 创建水印内容并添加到父元素中
  waterMaskEl.style.background = `url(${createBase64()}) left top repeat`;
  parentEl.appendChild(waterMaskEl);
  return children;
};

export default WaterMask;
