import { useRouter } from "next/router";
import Link from "next/link";

interface ActiveLink {
  children: React.ReactNode;
  href: string;
}

const ActiveLink = ({ children, href }: ActiveLink) => {
  const router = useRouter();

  return (
    <Link href={href}>
      <a
        className={`text-[#9D9D9D] hover:text-[#727272] ${
          router.asPath === href ? "text-primary font-medium" : ""
        }`}
      >
        {children}
      </a>
    </Link>
  );
};

export default ActiveLink;
