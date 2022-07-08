import React, { FC, ReactNode } from "react";
import { Column, InfiniteLoader, Table } from "react-virtualized";
import Spinner from "../Spinner";
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
    return (
      <div className="flex items-center justify-center h-full">
        {isLoading ? <Spinner /> : null}
      </div>
    );
  };

  return (
    <InfiniteLoader
      isRowLoaded={({ index }) => Boolean(data[index])}
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
          className="w-fit border border-gray-300 bg-white rounded-md text-xsmall"
          headerClassName="normal-case text-center first:text-start"
          rowClassName="border-b border-gray-300 pl-4 hover:bg-slate-100 cursor-pointer text-center"
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
              className="text-gray-500"
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
