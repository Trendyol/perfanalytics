import React, { FC } from "react";
import { Column, Table } from "react-virtualized";
import "react-virtualized/styles.css";
import styles from "./style.module.scss";

const CustomTable: FC<CustomTableProps> = (props) => {
  const {
    data,
    columnData,
    width = 1400,
    height = 500,
    headerHeight = 40,
    rowHeight = 40,
  } = props;

  return (
    <Table
      width={width}
      height={height}
      headerHeight={headerHeight}
      rowHeight={rowHeight}
      rowCount={data.length}
      rowGetter={({ index }) => data[index]}
      className={styles.table}
      headerClassName={styles.headerCell}
      rowClassName={styles.row}
    >
      {columnData.map((data) => (
        <Column
          key={data.dataKey}
          label={data.label}
          dataKey={data.dataKey}
          width={data.columnWidth ?? 400}
          className={styles.rowCell}
          cellRenderer={({ cellData }) =>
            data.cellRenderer ? data.cellRenderer(cellData) : cellData
          }
        />
      ))}
    </Table>
  );
};

interface CustomTableProps {
  width?: number;
  height?: number;
  headerHeight?: number;
  rowHeight?: number;
  data: unknown[];
  columnData: Array<{
    dataKey: string;
    label: string;
    columnWidth?: number;
    cellRenderer?: (cellData: any) => React.ReactNode;
  }>;
}

export default CustomTable;
