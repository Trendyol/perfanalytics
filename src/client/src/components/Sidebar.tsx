import React from "react";
import { Menu } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const { SubMenu } = Menu;

interface Props {
  tags: any;
}

const Sidebar: React.FC<Props> = (props) => {
  const { tags } = props;
  const history = useHistory();

  const handleClick = (e: any) => {
    history.push({
      pathname: "/",
      search: e.key === "all" ? "" : `?tag=${e.key}`,
    });
  };
  return (
    <div className="sidebar">
      <Menu
        onClick={handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
      >
        <SidebarHeader />
        <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Tags">
          <Menu.Item key="all">All</Menu.Item>
          {tags.map((x: any) => (x.tag ? <Menu.Item key={x.tag}>{x.tag}</Menu.Item> : null))}
        </SubMenu>
      </Menu>
      <div className="footer">
        Made with&nbsp;
        <FontAwesomeIcon icon={faHeart as IconProp} /> by Perfanalytics Team
      </div>
    </div>
  );
};

const SidebarHeader: React.FC = () => (
  <div className="header-area">
    <Link to="/">
      <img src="https://cdn.dsmcdn.com/mweb/production/trendyol-logo.svg" alt="trendyol-logo" height={50} width={50} />
      <div className="title">Perfanalytics</div>
    </Link>
  </div>
);

export default Sidebar;
