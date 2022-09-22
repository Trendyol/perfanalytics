import React, { FC, ReactNode } from "react";
import { Column, InfiniteLoader, Table } from "react-virtualized";
import clsx from "clsx";
import "react-virtualized/styles.css";
import useTranslation from "next-translate/useTranslation";

const CustomTable: FC<CustomTableProps> = (props) => {
  const { data, length, isLoading, columnData, height = 340, width = 1300, rowHeight = 35, headerHeight = 40, onRowClick, onNextPage } = props;
  const { t } = useTranslation("layout");

  const noRowsRenderer = () => {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex justify-center items-center w-full h-full animate-pulse-slow bg-gray-100 text-3xl"></div>
        <span className="absolute text-3xl text-gray-500">{isLoading ? t("loading") : t("no_result")}</span>
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
          className="w-fit bg-white rounded-md text-xs"
          headerClassName="text-gray-500 flex !shrink-0 items-center normal-case justify-center first:justify-start"
          rowClassName={({ index }: { index: number }) => clsx("border-b border-gray-200", "text-center", index !== -1 && "hover:bg-gray-50 cursor-pointer")}
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
              flexGrow={1}
              width={data.columnWidth ?? 300}
              className="text-gray-400"
              cellRenderer={({ cellData, rowData }) => (data.cellRenderer ? data.cellRenderer(cellData, rowData) : cellData)}
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
  length: number;
  columnData: Array<{
    dataKey: string;
    label: string;
    columnWidth?: number;
    cellRenderer?: (cellData: any, rowData: any) => ReactNode;
  }>;
  isLoading?: boolean;
  onNextPage: () => void;
  onRowClick?: (rowData: any) => void;
}

export default CustomTable;
