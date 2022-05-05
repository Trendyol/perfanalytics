import React from "react";
import { Link } from "react-router-dom";
import { Column, Table } from "react-virtualized";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Spin } from "antd";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Indicator from "./Indicator";
import { tableColumns } from "../utils/AppData";
import { LighthouseResult } from "../interfaces";

interface Props {
  data: LighthouseResult[];
  loading: boolean;
}

const DataTable: React.FC<Props> = ({ data, loading }) => {
  const renderCell = (field: { id: string }, value: number) => {
    if (field.id === "id") {
      return (
        <div className="report-button">
          <Link to={`/detail/${value}`}>
            <FontAwesomeIcon icon={faSearch as IconProp} />
          </Link>
        </div>
      );
    }

    if (field.id === "date") {
      return moment(value).format("h:mm:ss MM/DD/YY");
    }

    if (field.id === "status") {
      return <Indicator score={value} />;
    }

    return <div className="cell">{value ? <Indicator score={parseFloat(value.toFixed(0))} /> : "-"}</div>;
  };

  const rowRenderer = ({ rowData, style }: { rowData: any; style: object }) => (
    <div style={style} className="row">
      {tableColumns.map((field) => {
        const value = rowData[field.id];
        return renderCell(field, value);
      })}
    </div>
  );

  return (
    <div className="data-table">
      <Spin spinning={loading}>
        <Table
          width={1200}
          height={350}
          headerHeight={40}
          rowHeight={70}
          rowCount={data.length}
          rowGetter={({ index }) => data[index]}
          rowRenderer={rowRenderer}
        >
          {tableColumns.map((column: any) => (
            <Column label={column.short} dataKey={column.id} width={100} />
          ))}
        </Table>
      </Spin>
    </div>
  );
};

export default DataTable;
