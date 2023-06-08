import useTranslation from "next-translate/useTranslation";
import { FC, useState } from "react";
import DomainModal from "./components/DomainModal";
import DomainTable from "./components/DomainTable";
import InfoCardContainer from "./components/InfoCardContainer";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const { t } = useTranslation("dashboard");
  const [showDomainModal, setShowDomainModal] = useState(false);

  const handleShowDomainModal = () => {
    setShowDomainModal(true);
  };

  const handleCloseDomainModal = () => {
    setShowDomainModal(false);
  };

  return (
    <div data-testid="home-dashboard" className="flex flex-col items-center min-h-full">
      <div className="flex flex-col w-full">
        <InfoCardContainer />
        <DomainTable />
        <DomainModal show={showDomainModal} onClose={handleCloseDomainModal} />
      </div>
    </div>
  );
};

export default Home;
