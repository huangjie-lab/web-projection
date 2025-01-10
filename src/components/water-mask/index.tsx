import useAuthStore from '@/store/auth';
import React, { useEffect, useRef, useState, type FC, type ReactElement } from 'react';
import styles from './index.scss';
import { useMutationObserver } from './useMutationObserver';
import useRafDebounce from './useRafDebounce';
import { useWaterMask } from './useWaterMask';
import { reRender } from './util';
export const defaultOption = {
  subtree: true, //当为 true 时，将会监听以 target 为根节点的整个子树。默认值为 false。
  childList: true, //当为 true 时，监听 target 节点中发生的节点的新增与删除（同时，如果 subtree 为 true，会针对整个子树生效）。默认值为 false。
  attributeFilter: ['style', 'class'] //一个用于声明哪些属性名会被监听的数组。如果不声明该属性，所有属性的变化都将触发通知。
};
/**
 * 高阶组件
 * 实现水印效果
 */
interface WaterMaskProps {
  className?: string;
  style?: React.CSSProperties;
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
function createBase64(maskText: string | undefined): string {
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

const WaterMask: FC<WaterMaskProps> = ({ children, style, className }) => {
  const { info } = useAuthStore();
  const [waterMaskInfo, setWaterMaskInfo] = useState<[base64: string]>(null!);
  const waterMaskStyles: React.CSSProperties = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: 99999,
    pointerEvents: 'none',
    backgroundRepeat: 'repeat'
  };
  const [appendWaterMask, isWaterMaskEle] = useWaterMask(waterMaskStyles);

  const init = () => {
    // 简化版生成base64Url;
    setWaterMaskInfo([createBase64(info?.fullname)]);
  };

  // 类似防抖
  const syncInit = useRafDebounce(init);

  useEffect(() => {
    info && syncInit();
  }, [info]);

  // 追加水印到容器
  useEffect(() => {
    if (waterMaskInfo) {
      appendWaterMask(container.current as HTMLDivElement, waterMaskInfo[0]);
    }
  }, [waterMaskInfo]);
  // 监听水印元素和容器元素
  const container = useRef<HTMLDivElement>(null);
  const onMutate = (mutationList: MutationRecord[]) => {
    mutationList.forEach((mutation: MutationRecord) => {
      if (reRender(mutation, isWaterMaskEle)) {
        console.log('rendered');
        syncInit();
      }
    });
  };
  useMutationObserver(container.current as HTMLElement, onMutate);
  return (
    // style={style} className todo...
    <div ref={container} className={[styles['water-mark-root'], className].join(' ')} style={style}>
      {children}
      {/* 水印元素 */}
    </div>
  );
};

export default WaterMask;
