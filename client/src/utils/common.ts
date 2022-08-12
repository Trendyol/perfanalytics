export const hasItem = (array: any[] | undefined | null): boolean => Boolean(array && array.length > 0);

export const flattenNestedProperty = (property: any, array?: any[]) => {
  let flattenArray = [] as any;

  if (array && Array.isArray(array)) {
    array.map((m: any) => {
      if (m[property] && m[property].length) {
        flattenArray = [...flattenArray, ...m[property]];
      }
      return m;
    });
  }

  return flattenArray;
};

export const getFavicon = (url: string) => {
  return `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=64`;
};
