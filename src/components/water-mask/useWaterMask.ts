import React from 'react';
import { stylesToString } from './util';

export type AppendWaterMask = (container: HTMLElement, baseurl: string) => void;
export type IsWaterMaskEle = (ele: any) => boolean;

export const useWaterMask = (
  waterMaskStyles: React.CSSProperties
): [AppendWaterMask, IsWaterMaskEle] => {
  const waterMaskMap = React.useRef(new Map<HTMLElement, HTMLDivElement>());

  // 追加函数
  const appendWaterMask: AppendWaterMask = (container: HTMLElement, baseurl: string) => {
    if (container) {
      if (!waterMaskMap.current.get(container)) {
        const newWaterMaskEle = document.createElement('div');
        waterMaskMap.current.set(container, newWaterMaskEle);
      }
      const waterMaskEle = waterMaskMap.current.get(container)!;
      waterMaskEle.setAttribute(
        'style',
        stylesToString({
          ...waterMaskStyles,
          backgroundImage: `url("${baseurl}")`
        })
      );
      container.append(waterMaskEle);
    }
  };

  // 判断是否为水印元素
  const isWaterMaskEle: IsWaterMaskEle = (ele: any) => {
    return Array.from(waterMaskMap.current.values()).includes(ele);
  };

  return [appendWaterMask, isWaterMaskEle];
};
