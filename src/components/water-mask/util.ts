// 转化css属性key
export const toLowercaseSeparator = (key: string) => {
  return key.replace(/([A-Z])/g, '-$1').toLowerCase();
};

export const stylesToString = (waterMaskStyles: React.CSSProperties) => {
  return Object.keys(waterMaskStyles)
    .map((key) => {
      return `${toLowercaseSeparator(key)}: ${waterMaskStyles[key as keyof React.CSSProperties]}; `;
    })
    .join('');
};

// 是否需要重新生成水印
export const reRender = (
  mutation: MutationRecord,
  isWaterMaskEle: (ele: any) => boolean
): boolean => {
  let flag = false;
  if (mutation.removedNodes.length) {
    flag = Array.from(mutation.removedNodes).some((node) => isWaterMaskEle(node));
    flag && console.log('rendered remove');
  }
  if (mutation.type === 'attributes' && isWaterMaskEle(mutation.target)) {
    flag = true;
    console.log('rendered attributes');
  }
  return flag;
};
