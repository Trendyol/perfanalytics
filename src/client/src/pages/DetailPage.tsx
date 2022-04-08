import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { PageHeader } from "antd";
import { useParams, useHistory } from "react-router-dom";
import axios from "../utils/axiosInstance";

const DetailPage: React.FC = () => {
  const { id }: { id: string } = useParams();
  const history = useHistory();
  const [lighthouseReport, setLighthouseReport] = useState();
  const [lighthouseReportLoading, setLighthouseReportLoading] = useState(false);

  useEffect(() => {
    getLighthouseReport();
    // eslint-disable-next-line
  }, []);

  const getLighthouseReport = () => {
    axios
      .get(`/lighthouse/${id}`)
      .then((res: any) => {
        const html = res.data.content.html || `${process.env.REACT_APP_CDN_URL}/${id}.html`;
        setLighthouseReport(html);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLighthouseReportLoading(false);
      });
  }

  return (
    <div id="detail-page" className="page">
      <Helmet>
        <title>Perfanalytics | Details</title>
      </Helmet>
      <PageHeader onBack={() => history.goBack()} className="site-page-header-responsive" title="Details">
        <div className="iframe-container">
          {!lighthouseReportLoading && <iframe title="lighthouse" src={lighthouseReport} allowFullScreen={true} />}
        </div>
      </PageHeader>
    </div>
  );
};

export default DetailPage;
