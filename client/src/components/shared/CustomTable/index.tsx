import React, { FC, ReactNode } from "react";
import { Column, InfiniteLoader, Table } from "react-virtualized";
import Spinner from "../Spinner";
import styles from "./style.module.scss";
import "react-virtualized/styles.css";

const CustomTable: FC<CustomTableProps> = (props) => {
  const {
    data,
    length,
    isLoading,
    onNextPage,
    columnData,
    onRowClick,
    height = 300,
    width = 1200,
    rowHeight = 40,
    headerHeight = 40,
  } = props;

  const noRowsRenderer = () => {
    return <div className={styles.empty}>{isLoading ? <Spinner /> : null}</div>;
  };

  return (
    <InfiniteLoader
      isRowLoaded={({ index }) => {
        return Boolean(data[index]);
      }}
      loadMoreRows={async () => onNextPage()}
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
          noRowsRenderer={noRowsRenderer}
          onRowClick={onRowClick}
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
    cellRenderer?: (cellData: any, rowData: any) => ReactNode;
  }>;
  onNextPage: () => void;
  isLoading: boolean;
  length: number;
  onRowClick?: (rowData: any) => void;
}

export default CustomTable;
