import { DEFAULT_TAG, USER_KEY } from "@constants";
import { getStartDate } from "./common";
import { fetcher } from "./fetcher";

export const getUserData = async (context: any) => {
  let data = null;

  try {
    const authCookie = context.req.cookies["auth-cookie"];

    data = await fetcher(USER_KEY, {
      headers: {
        Cookie: `auth-cookie=${authCookie};`,
      },
    });
  } catch {}

  return data;
};

export const getDomainKey = (pageIndex: number, previousPageData?: any) => {
  if (previousPageData && !previousPageData?.hasNextPage) return null;
  return `/domain?index=${pageIndex}`;
};

export const getPageKey = (domainId: string, pageIndex: number, tagId?: string, previousPageData?: any) => {
  if (previousPageData && !previousPageData?.hasNextPage) return null;
  const basePageKey = `/page?index=${pageIndex}&domainId=${domainId}`;
  return !tagId || tagId === DEFAULT_TAG.id ? basePageKey : `${basePageKey}&tagId=${tagId}`;
};

export const getReportKey = (pageId: string, initialDate: Date, periodAsDay: number, previousPageData?: any) => {
  if (previousPageData && !previousPageData?.hasNextPage) {
    return null;
  }

  const { startDate, endDate } = getStartDate(initialDate, periodAsDay);

  return `/lighthouse?pageId=${pageId}&startDate=${startDate}&endDate=${endDate}`;
};
