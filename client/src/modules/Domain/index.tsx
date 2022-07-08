import { FC, useEffect } from "react";
import { useRouter } from "next/router";
import useDomain from "@hooks/useDomain";
import Button from "@components/shared/Form/Button";

const Domain: FC = () => {
  const router = useRouter();
  const { domainName } = router.query;
  const { domain, isError } = useDomain(domainName as string);

  useEffect(() => {
    if (isError) {
      router.push("/");
    }
  }, [domain]);

  return (
    <div>
      <Button onClick={() => router.back()}>Back</Button>{" "}
      {JSON.stringify(domain)}
    </div>
  );
};

export default Domain;
