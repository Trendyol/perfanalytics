/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { PageHeader, Input, Select, Tag, Tooltip } from "antd";
import { Helmet } from "react-helmet";
import { Link, withRouter } from "react-router-dom";
import queryString from 'query-string';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop, faMobileAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import validator from "validator";
import axios from "../utils/axiosInstance";
import { DEVICE, STATUS } from "../constants";
import EntryTable from "../components/EntryTable";
import Indicator from "../components/Indicator";
import { Entry } from "../interfaces";

const { Search } = Input;
const { Option } = Select;

interface Props {
  location: any;
}
const HomePage: React.FC<Props> = (props) => {
  const params = queryString.parse(props.location.search)
  const [device, setDevice] = useState<DEVICE>(DEVICE.DESKTOP);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [searchValue, setSearchValue] = useState("https://");
  const [addEntryLoading, setAddEntryLoading] = useState(false);
  const [getEntriesLoading, setGetEntriesLoading] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    getEntries();
  }, [params.tag]);

  const getEntries = () => {
    setGetEntriesLoading(true);
    axios
      .get(`/entry`,{ params: params })
      .then((res: any) => {
        setEntries(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setGetEntriesLoading(false);
      });
  };

  const addEntry = () => {
    if (validator.isURL(searchValue) === false) {
      return setValidationError("URL is not valid.");
    }

    setAddEntryLoading(true);
    setValidationError("");
    axios
      .post("/entry", {
        url: searchValue,
        device: device,
      })
      .then((res: any) => {
        const newEntry = res.data;
        const updatedEntries = [newEntry, ...entries];
        setEntries(updatedEntries);
      })
      .catch((err) => {})
      .finally(() => {
        setAddEntryLoading(false);
        setSearchValue("https://");
      });
  };

  const selectDevice = (value: number) => {
    setDevice(value);
  };

  const columns = [
    {
      title: "Report",
      dataIndex: "id",
      key: "id",
      width: 80,
      align: "center" as "center",
      render: (e: any) => (
        <div className="report-button">
          <Link to={`report/${e}`}>
            <FontAwesomeIcon icon={faSearch} />
          </Link>
        </div>
      ),
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "id",
      render: (e: any) => (
        <a href={e} rel="noreferrer" target="_blank">
          {e}
        </a>
      ),
      width: 300,
      sorter: (a: any, b: any) => new Date(b.date).valueOf() - new Date(a.date).valueOf(),
    },
    {
      title: "Device",
      dataIndex: "device",
      key: "device",
      align: "center" as "center",
      width: 100,
      sorter: (a: any, b: any) => a.device - b.device,
      render: (e: any) => (
        <div className={"device-container " + (e === DEVICE.DESKTOP ? "desktop" : "mobile")}>
          <FontAwesomeIcon icon={e === DEVICE.DESKTOP ? faDesktop : faMobileAlt} />
        </div>
      ),
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "-",
      align: "center" as "center",
      width: 100,
      render: (e: any) =>
        e && (
          <Tag color={"default"} key={"tag"}>
            {`${e.toUpperCase()}`}
          </Tag>
        ),
    },
    {
      title: "Channel",
      dataIndex: "slackChannel",
      key: "-",
      align: "center" as "center",
      width: 100,
      render: (e: any) =>
        e && (
          <Tag color={"default"} key={"tag"}>
            {`#${e}`}
          </Tag>
        ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status  ",
      align: "center" as "center",

      render: (e: any) =>
        e === STATUS.FAIL ? (
          <Tooltip
            placement="top"
            title="This URL is erroneous. It is either redirecting to another website or giving a 404 Error. You may consider changing this URL."
          >
            <div>
              <Indicator score={e}></Indicator>
            </div>
          </Tooltip>
        ) : (
          <Indicator score={e}></Indicator>
        ),

      width: 100,
    },
  ];
  const selectAfter = (
    <Select className="device-select" onChange={(value) => selectDevice(value)} value={device} size="middle">
      <Option value={DEVICE.DESKTOP}>Desktop</Option>
      <Option value={DEVICE.MOBILE}>Mobile</Option>
    </Select>
  );
  return (
    <div id="home-page" className="page">
      <Helmet>
        <title>Perfanalytics | Main</title>
      </Helmet>
      <PageHeader className="site-page-header-responsive">
        <div className="main-area">
          <Search
            addonBefore={selectAfter}
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            enterButton="Add"
            size="large"
            loading={addEntryLoading}
            onPressEnter={() => addEntry()}
            onSearch={() => addEntry()}
          />
          <div className="validation-error">{validationError}</div>
          <EntryTable data={entries} columns={columns} loading={getEntriesLoading} height={"75vh"} />
        </div>
      </PageHeader>
    </div>
  );
};

export default withRouter(HomePage);
