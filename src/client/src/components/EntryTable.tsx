import React from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Entry } from "../interfaces";

interface Props {
  data: Entry[];
  columns: ColumnsType<Entry>;
  loading: boolean;
  height?: number | string;
}

const EntryTable: React.FC<Props> = (props) => {
  const { data, columns, loading, height = 300 } = props;

  return (
    <div className="entry-table">
      <div style={{ height: `${height}`, overflow: "auto" }}>
        <Table columns={columns} dataSource={data} rowKey="id" loading={loading} pagination={false} />
      </div>
    </div>
  );
};

export default EntryTable;
