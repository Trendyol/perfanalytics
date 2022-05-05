import React, { useState, useEffect } from "react";
import { Modal, Divider, Button, Popconfirm, Input, Slider, Tooltip, InputNumber, Checkbox } from "antd";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import axios from "../utils/axiosInstance";

import { metrics, timeOptions } from "../utils/AppData";
import { Entry, SlackMetrics } from "../interfaces";

interface Props {
  id: string;
  entry: Entry;
  show: boolean;
  hide: () => void;
  clearResults: () => void;
  setEntry: (state: any) => void;
  getTags: () => void;
}

const SettingsModal: React.FC<Props> = (props) => {
  const { show, hide, id, clearResults, entry, setEntry, getTags } = props;

  const [alertMetrics, setAlertMetrics] = useState<SlackMetrics>({
    slack_prf: 0,
    slack_fcp: 0,
    slack_si: 0,
    slack_lcp: 0,
    slack_fmp: 0,
    slack_tbt: 0,
    slack_cls: 0,
    slack_tti: 0,
  });
  const [slackChannel, setSlackChannel] = useState("");
  const [url, setUrl] = useState("");
  const [tag, setTag] = useState("");
  const [checkedTimes, setCheckedTimes] = useState<string[]>([]);
  const [initComponent, setInitComponent] = useState(true);

  useEffect(() => {
    if (entry !== null && initComponent) {
      setAlertMetrics({ ...(entry as SlackMetrics) });
      setSlackChannel(entry.slackChannel);
      setTag(entry.tag);
      setUrl(entry.url);

      const times: string[] = [];
      timeOptions.forEach((time) => {
        if ((entry as any)[time.value] === true) {
          times.push(time.value);
        }
      });

      setCheckedTimes(times);
      setInitComponent(false);
    }
  }, [entry, initComponent]);

  const history = useHistory();

  const removeEntry = (_id: string) => {
    axios
      .delete(`/entry/${_id}`)
      .then(() => {
        history.replace("/");
      })
      .catch(() => {});
  };

  const clearLhResults = (_id: string) => {
    axios
      .delete(`/lighthouse/${_id}`)
      .then(() => {
        clearResults();
      })
      .catch(() => {});
  };

  const handleAlertMetrics = (short: string, e: number) => {
    setAlertMetrics({ ...alertMetrics, [short]: e > 100 ? 100 : e });
  };

  const updateEntry = () => {
    const times: object[] = [];

    timeOptions.forEach((t) => {
      times.push({
        [t.value]: checkedTimes.some((c) => c === t.value),
      });
    });
    const timesObject = Object.assign({}, ...times);

    axios
      .put(`/entry/${id}`, {
        ...alertMetrics,
        ...timesObject,
        slackChannel,
        url,
        tag: tag ? tag.toUpperCase() : "",
      })
      .then(() => {
        hide();
        setEntry({ ...entry, url });
        getTags();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal
      centered
      title="Settings"
      visible={show}
      onCancel={hide}
      footer={[
        <Button key="back" onClick={() => hide()}>
          Cancel
        </Button>,
        <Button onClick={() => updateEntry()} key="submit" type="primary">
          Save
        </Button>,
      ]}
    >
      <div className="modal-container">
        <div className="entry-section">
          <div className="title">Entry Configuration</div>
          <Divider />
          <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL" />
        </div>
        <div className="tag-section">
          <div className="title">Tag Configuration</div>
          <Divider />
          <Input value={tag} onChange={(e: any) => setTag(e.target.value)} placeholder="Tag" />
        </div>
        <div className="slack-section">
          <div className="title">Slack Configuration</div>
          <Divider />
          <Input
            prefix="#"
            value={slackChannel}
            onChange={(e) => setSlackChannel(e.target.value)}
            placeholder="Slack Channel"
          />
          <div className="alert-header">
            Alerts
            <Tooltip
              placement="top"
              title="Perfanalytics Bot will send an alert to your channel if the scores are less than the thresholds you adjust below."
            >
              <FontAwesomeIcon icon={faInfoCircle as IconProp} />
            </Tooltip>
          </div>
          <div className="alerts">
            {metrics.map((metric: { name: string; short: string }) => (
              <div key={metric.short}>
                <div>{metric.name}</div>
                <div className="slider-container">
                  <Slider
                    value={alertMetrics[metric.short as keyof SlackMetrics]}
                    min={0}
                    max={100}
                    onChange={(e) => handleAlertMetrics(metric.short, e)}
                  />
                  <InputNumber
                    min={0}
                    max={100}
                    style={{ margin: "0 16px" }}
                    value={alertMetrics[metric.short as keyof SlackMetrics]}
                    onChange={(e) => handleAlertMetrics(metric.short, e)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="reports-header">
            Reports
            <Tooltip
              placement="top"
              title="Perfanalytics Bot will send reports to the channel on the time basis you provide below."
            >
              <FontAwesomeIcon icon={faInfoCircle as IconProp} />
            </Tooltip>
            <div className="checkbox-container">
              <Checkbox.Group options={timeOptions} value={checkedTimes} onChange={(e: any) => setCheckedTimes(e)} />
            </div>
          </div>
        </div>
        <div className="delete-section">
          <div className="title">Delete</div>
          <Divider />
          <Popconfirm
            placement="top"
            title=" Are you sure to clear all Lighthouse results for this entry?"
            onConfirm={() => {
              clearLhResults(id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Clear results</Button>
          </Popconfirm>
          <Popconfirm
            placement="top"
            title="Are you sure to delete this entry? "
            onConfirm={() => {
              removeEntry(id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete entry
            </Button>
          </Popconfirm>
        </div>
      </div>
    </Modal>
  );
};

export default SettingsModal;
