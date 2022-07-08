import { FC, useEffect } from "react";
import { useRouter } from "next/router";
import { useDomain } from "@hooks/useDomain";
import Button from "@components/shared/Form/Button";

const Domain: FC = () => {
  const router = useRouter();
  const { domain } = router.query;
  const { data, isError } = useDomain(domain as string);

  useEffect(() => {
    if (isError) {
      router.push("/");
    }
  }, [data]);

  return (
    <div>
      <Button onClick={() => router.back()}>Back</Button> {JSON.stringify(data)}
    </div>
  );
};

export default Domain;
