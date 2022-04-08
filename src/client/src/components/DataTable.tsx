import React from "react";
import { Link } from "react-router-dom";
import { Column, Table } from "react-virtualized";
import { tableColumns } from "../utils/AppData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import Indicator from "../components/Indicator";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Spin } from "antd";
import { LighthouseResult } from "../interfaces";

interface Props {
  data: LighthouseResult[];
  loading: boolean;
}

const DataTable: React.FC<Props> = ({ data, loading }) => {
  const rowRenderer = ({ rowData, style }: { rowData: any; style: {} }) => {
    return (
      <div style={style} className="row">
        {tableColumns.map((field) => {
          const value = rowData[field.id];
          return (
            <div className="cell">
              {field.id === "id" ? (
                <div className="report-button">
                  <Link to={`/detail/${value}`}>
                    <FontAwesomeIcon icon={faSearch} />
                  </Link>
                </div>
              ) : field.id === "date" ? (
                moment(value).format("h:mm:ss MM/DD/YY")
              ) : field.id === "status" ? (
                <Indicator score={value} />
              ) : (
                <div className="cell">{value ? <Indicator score={parseFloat(value.toFixed(0))} /> : "-"}</div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

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
          {tableColumns.map((column: any) => {
            return <Column label={column.short} dataKey={column.id} width={100} />;
          })}
        </Table>
      </Spin>
    </div>
  );
};

export default DataTable;
