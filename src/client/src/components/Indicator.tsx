import React from "react";
import { faSquare, faCircle, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { COLOR, STATUS } from "../constants";

interface Props {
  score: string | number;
}

const Indicator: React.FC<Props> = (props) => {
  const { score } = props;

  const getProps = () => {
    let Component;
    let color = "";

    switch (true) {
      case score < 50 || score === STATUS.FAIL:
        color = COLOR.RED;
        Component = <FontAwesomeIcon icon={faSquare as IconProp} rotation={270} />;
        break;
      case score < 90:
        color = COLOR.YELLOW;
        Component = <FontAwesomeIcon icon={faPlay as IconProp} rotation={270} />;
        break;
      case score >= 90 || score === STATUS.DONE:
        color = COLOR.GREEN;
        Component = <FontAwesomeIcon icon={faCircle as IconProp} rotation={270} />;
        break;
      case score === STATUS.PENDING || score === STATUS.RUNNING:
        Component = <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />;
        break;
      default:
        Component = null;
        break;
    }

    return { Component, color };
  };
  const { Component, color } = getProps();
  return (
    <div className="indicator" style={{ color }}>
      {Component} {typeof score === "number" ? score : ""}
    </div>
  );
};

export default Indicator;
