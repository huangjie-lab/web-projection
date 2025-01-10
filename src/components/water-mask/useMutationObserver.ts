import { useEffect } from 'react';

export const defaultOption = {
  subtree: true, //当为 true 时，将会监听以 target 为根节点的整个子树。默认值为 false。
  childList: true, //当为 true 时，监听 target 节点中发生的节点的新增与删除（同时，如果 subtree 为 true，会针对整个子树生效）。默认值为 false。
  attributeFilter: ['style', 'class'] //一个用于声明哪些属性名会被监听的数组。如果不声明该属性，所有属性的变化都将触发通知。
};

export const useMutationObserver = (
  nodeOrList: HTMLElement | HTMLElement[],
  callback: MutationCallback,
  options?: MutationObserverInit
) => {
  useEffect(() => {
    if (!nodeOrList) {
      return;
    }

    let instance: MutationObserver;
    if ('MutationObserver' in window) {
      instance = new MutationObserver(callback);
      const nodeList = Array.isArray(nodeOrList) ? nodeOrList : [nodeOrList];
      nodeList.forEach((element: HTMLElement) => {
        instance.observe(element, options || defaultOption);
      });
    }
    return () => {
      instance?.takeRecords();
      instance?.disconnect();
    };
  }, [nodeOrList, options, callback]);
};
