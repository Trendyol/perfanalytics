import { USER_KEY } from "@constants";
import { fetcher } from "./fetcher";

export const getDomainKey = (pageIndex: number, previousPageData?: any) => {
  if (previousPageData && !previousPageData?.hasNextPage) return null;
  return `/domain?index=${pageIndex}`;
};

async function getUserDataInServerSide(context: any) {
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
}

export { getUserDataInServerSide };
