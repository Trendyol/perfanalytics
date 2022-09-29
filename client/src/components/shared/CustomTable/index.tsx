import classnames from "classnames";
import useTranslation from "next-translate/useTranslation";
import { FC, ReactNode } from "react";
import { AutoSizer, Column, InfiniteLoader, Table } from "react-virtualized";
import "react-virtualized/styles.css";

const CustomTable: FC<CustomTableProps> = (props) => {
  const { data, length, isLoading, columnData, rowHeight = 35, headerHeight = 40, onRowClick, onNextPage } = props;

  const { t } = useTranslation("common");

  const noRowsRenderer = () => {
    return (
      <div
        className={classnames("flex justify-center items-center w-full h-full rounded-b-lg bg-gray-100 text-displaySm text-gray-500", {
          "animate-pulse-slow": isLoading,
        })}
      >
        {isLoading ? t("fetching_data_placeholder") : t("no_data")}
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
        <AutoSizer defaultHeight={340} disableHeight>
          {({ width }) => (
            <Table
              width={width}
              height={340}
              headerHeight={headerHeight}
              rowHeight={rowHeight}
              rowCount={data.length}
              rowGetter={({ index }) => data[index]}
              className="bg-white rounded-lg text-xs"
              headerClassName="text-sm font-normal text-gray-400 flex !shrink-0 items-center normal-case justify-center first:justify-start"
              rowClassName={({ index }: { index: number }) =>
                classnames("border-b border-gray-200", "text-center", index !== -1 && "hover:bg-gray-50 cursor-pointer")
              }
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
                  width={100}
                  className="text-gray-400"
                  cellRenderer={({ cellData, rowData }) => (data.cellRenderer ? data.cellRenderer(cellData, rowData) : cellData)}
                />
              ))}
            </Table>
          )}
        </AutoSizer>
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
