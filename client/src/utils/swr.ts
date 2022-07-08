export const getDomainKey = (pageIndex: number, previousPageData?: any) => {
  if (previousPageData && !previousPageData?.hasNextPage) return null;
  return `/domain?index=${pageIndex}`;
};
