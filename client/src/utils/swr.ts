import { USER_KEY } from "@constants";
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

export const getPageKey = (domainId: string, tagId?: string) => {
  let key = `/page?domainId=${domainId}`;
  if (tagId) {
    key += `&tagId=${tagId}`;
  }

  return key;
};

export const getReportKey = (pageId: string, startDate: number, endDate: number, previousPageData?: any) => {
  if (previousPageData && !previousPageData?.hasNextPage) {
    return null;
  }

  return `/lighthouse?pageId=${pageId}&startDate=${new Date(startDate).toISOString()}&endDate=${new Date(endDate).toISOString()}`;
};
