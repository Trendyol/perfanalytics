import useDomain from "@hooks/useDomain";
import classnames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

const Breadcrumb: FC = () => {
  const router = useRouter();
  const { domain } = useDomain(router.query.domainId as string);

  const appRoutes = [
    { name: "Dashboard", query: "dashboard", link: "/dashboard" },
    { name: domain?.name, query: "domainId", link: `/dashboard/${router.query.domainId}` },
    { name: "Reports", query: "pageId", link: `/dashboard/${router.query.domainId}/${router.query.pageId}` },
  ];
  const filteredRoutes = appRoutes.filter((link) => router.route.includes(link.query));

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex space-x-2 md:space-x-3">
        {filteredRoutes.map((item, i) => {
          const isLast = i === filteredRoutes.length - 1;
          return (
            <li className="flex items-center">
              <div className="flex items-center">
                <Link href={item.link}>
                  <a
                    className={classnames("capitalize text-displaySm", {
                      "text-gray-700 font-normal": !isLast,
                      "text-black font-bold": isLast,
                    })}
                  >
                    {item.name}
                  </a>
                </Link>
                {!isLast && <div className="ml-2 w-[2px] h-8 bg-gray-500"></div>}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
