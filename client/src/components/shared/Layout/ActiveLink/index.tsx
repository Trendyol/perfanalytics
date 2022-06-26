import { useRouter } from "next/router";
import Link from "next/link";
import classnames from "classnames";

interface ActiveLink {
  children: React.ReactNode;
  href: string;
}

const ActiveLink = ({ children, href }: ActiveLink) => {
  const router = useRouter();

  return (
    <Link href={href}>
      <a
        className={classnames("text-[#9D9D9D] hover:text-[#727272]", {
          "text-primary font-medium": router.asPath === href,
        })}
      >
        {children}
      </a>
    </Link>
  );
};

export default ActiveLink;
