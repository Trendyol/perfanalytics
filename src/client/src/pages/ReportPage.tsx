/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { PageHeader, Radio, Button, Statistic, Spin } from "antd";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faDesktop, faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useParams } from "react-router-dom";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import UxChart from "../components/UxChart";
import LineChart from "../components/LineChart";
import DataTable from "../components/DataTable";
import axios from "../utils/axiosInstance";
import { STATUS, DATES, COLOR, DEVICE } from "../constants";
import SettingsModal from "../components/SettingsModal";
import { Entry, LhStatistic, LighthouseResult, Tag } from "../interfaces";

interface Props {
  tags: Tag[];
  getTags: () => void;
}

const ReportPage: React.FC<Props> = (props) => {
  const { getTags, tags } = props;
  const pollingInterval = useRef(0);
  const [selectedDate, setSelectedDate] = useState<number>(DATES.D1);
  const [uxMetrics, setUxMetrics] = useState<any>(null);
  const [uxDates, setUxDates] = useState<any>(null);
  const [statistics, setStatistics] = useState<LhStatistic[]>();
  const [chartData, setChartData] = useState<[]>([]);
  const [tableData, setTableData] = useState<LighthouseResult[]>([]);
  const [entry, setEntry] = useState<Entry>();
  const [getLhResultsLoading, setGetLhResultsLoading] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const { id }: { id: string } = useParams();
  const history = useHistory();

  useEffect(() => {
    getEntryResult();

    if (statistics === null) {
      getStatistics(selectedDate);
    }
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - selectedDate);
    getLhResults(startDate.getTime());
    getUxResults(`${today.getFullYear()}.${today.getMonth() + 1}.${today.getDate()}`);
    getUxDates();

    return () => {
      clearInterval(pollingInterval.current);
    };
  }, []);

  const getUxResults = (date: string) => {
    axios
      .get(`/ux/${id}/${date}`)
      .then((res) => {
        setUxMetrics(res.data.metrics);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUxDates = () => {
    axios
      .get(`/ux/dates/${id}/`)
      .then((res) => {
        setUxDates(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchResultsWithInterval = (startDate: number, endDate?: number) => {
    clearInterval(pollingInterval.current);
    pollingInterval.current = window.setInterval(() => {
      getLhResults(startDate, endDate, true);
    }, 30000);
  };

  const getLhResults = (startDate = 0, endDate?: number, update?: boolean) => {
    fetchResultsWithInterval(startDate, endDate);

    if (!update) {
      setGetLhResultsLoading(true);
    }

    axios
      .get(`/lighthouse/${id}/${startDate}/${endDate || new Date().getTime()}`)
      .then((res) => {
        const result = res.data || [];
        const data = [] as any;
        result
          ?.filter((row: any) => row.status === STATUS.DONE)
          .forEach((e: any) => {
            data.push([
              e.date,
              e.prf.toFixed(0),
              e.fcp.toFixed(0),
              e.fmp.toFixed(0),
              e.lcp.toFixed(0),
              e.tbt.toFixed(0),
              e.si.toFixed(0),
              e.tti.toFixed(0),
              e.cls.toFixed(0),
            ]);
          });

        setTableData(result);
        setChartData(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setGetLhResultsLoading(false);
      });
  };

  const getEntryResult = () => {
    axios
      .get(`/entry/${id}`)
      .then((res) => {
        setEntry(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLhResultsByDate = (value: any) => {
    setSelectedDate(value);
    getStatistics(value);

    if (typeof value === "number") {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - value);
      return getLhResults(startDate.getTime());
    }
    return getLhResults();
  };

  const runLh = () => {
    axios
      .get(`/lighthouse/run/${id}/`)
      .then((res) => {
        setTableData([res.data, ...tableData]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStatistics = (value: any) => {
    axios
      .get(`/lighthouse/statistics/${id}?day=${value}`)
      .then((res) => {
        setStatistics(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clearResults = () => {
    setTableData([]);
    setChartData([]);
    getStatistics(0);
  };

  return (
    <div id="report-page" className="page">
      <Helmet>
        <title>Perfanalytics | Report</title>
      </Helmet>
      <PageHeader className="site-page-header-responsive" onBack={() => history.goBack()} title="Reports">
        <div className="main-area">
          <div className="url-container">
            <div className="link-device-container">
              {entry && (
                <>
                  <a className="url" href={entry.url} rel="noreferrer" target="_blank">
                    {`${entry.url}`}
                  </a>

                  <FontAwesomeIcon
                    className="device-icon"
                    viewBox="0 0 200 300"
                    icon={(entry.device === DEVICE.DESKTOP ? faDesktop : faMobileAlt) as IconProp}
                  />
                </>
              )}
            </div>
            <Button onClick={() => runLh()} type="primary">
              Run Lighthouse
            </Button>
          </div>
          <div className="dates-container">
            <Radio.Group onChange={(e) => getLhResultsByDate(e.target.value)} value={selectedDate} size="small">
              <Radio.Button value={DATES.D1}>1D</Radio.Button>
              <Radio.Button value={DATES.W1}>1W</Radio.Button>
              <Radio.Button value={DATES.M1}>1M</Radio.Button>
              <Radio.Button value={DATES.M6}>6M</Radio.Button>
              <Radio.Button value={DATES.Y1}>1Y</Radio.Button>
              <Radio.Button value={DATES.ALL}>ALL</Radio.Button>
            </Radio.Group>
            <Button className="settings-button" onClick={() => setShowSettingsModal(true)} shape="circle" size="large">
              <FontAwesomeIcon icon={faCog as IconProp} />
            </Button>
          </div>
          <div className="statistic-container">
            {statistics ? (
              statistics.map((statistic: any) => (
                <Statistic
                  key={statistic.name}
                  title={statistic.name.toUpperCase()}
                  value={statistic.percentDiff}
                  precision={1}
                  valueStyle={{ color: statistic.percentDiff < 0 ? COLOR.RED : COLOR.GREEN }}
                  prefix={`${statistic.score ? statistic.score.toFixed(1) : "-"} /`}
                  suffix="%"
                />
              ))
            ) : (
              <Spin />
            )}
          </div>
          <LineChart
            key="report-chart"
            data={chartData}
            height={240}
            loadChartData={getLhResults}
            setSelectedDate={setSelectedDate}
          />
          <DataTable data={tableData} loading={getLhResultsLoading} />
          <div className="divider" />
          <UxChart metrics={uxMetrics} uxDates={uxDates} getUxResults={getUxResults} />
        </div>
      </PageHeader>
      {entry && (
        <SettingsModal
          id={id}
          entry={entry}
          show={showSettingsModal}
          hide={() => setShowSettingsModal(false)}
          clearResults={clearResults}
          setEntry={setEntry}
          getTags={getTags}
        />
      )}
    </div>
  );
};

export default ReportPage;
