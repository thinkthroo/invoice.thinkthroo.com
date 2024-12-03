// pulled from https://github.com/lobehub/lobe-chat/blob/main/src/utils/storeDebug.ts#L1
export const setNamespace = (namespace: string) => {
  return (type: string, payload?: any) => {
    const name = [namespace, type].filter(Boolean).join('/');
    return payload
      ? {
          payload,
          type: name,
        }
      : name;
  };
};
