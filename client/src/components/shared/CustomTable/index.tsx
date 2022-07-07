import React, { FC } from "react";
import { Column, InfiniteLoader, Table } from "react-virtualized";
import "react-virtualized/styles.css";
import styles from "./style.module.scss";

const CustomTable: FC<CustomTableProps> = (props) => {
  const {
    data,
    length,
    isLoading,
    onNextPage,
    columnData,
    height = 300,
    width = 1200,
    rowHeight = 40,
    headerHeight = 40,
  } = props;

  return (
    <InfiniteLoader
      isRowLoaded={({ index }) => {
        return Boolean(data[index]);
      }}
      loadMoreRows={async () => {
        if (isLoading) return;
        onNextPage();
      }}
      rowCount={length}
      minimumBatchSize={10}
      threshold={9}
    >
      {({ onRowsRendered, registerChild }) => (
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
          onRowsRendered={onRowsRendered}
          ref={registerChild}
        >
          {columnData.map((data) => (
            <Column
              key={data.dataKey}
              label={data.label}
              dataKey={data.dataKey}
              width={data.columnWidth ?? 300}
              className={styles.rowCell}
              cellRenderer={({ cellData, rowData }) =>
                data.cellRenderer
                  ? data.cellRenderer(cellData, rowData)
                  : cellData
              }
            />
          ))}
        </Table>
      )}
    </InfiniteLoader>
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
    cellRenderer?: (cellData: any, rowData: any) => React.ReactNode;
  }>;
  onNextPage: () => void;
  isLoading: boolean;
  length: number;
}

export default CustomTable;
