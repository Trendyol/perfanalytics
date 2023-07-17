import { DEFAULT_TABLE_HEIGHTS } from "@constants";
import { default as classNames, default as classnames } from "classnames";
import useTranslation from "next-translate/useTranslation";
import { FC, ReactNode } from "react";
import { AutoSizer, Column, Table } from "react-virtualized";
import "react-virtualized/styles.css";

const CustomTable: FC<CustomTableProps> = (props) => {
  const {
    data,
    isLoading,
    columnData,
    rowHeight = DEFAULT_TABLE_HEIGHTS.row,
    headerHeight = DEFAULT_TABLE_HEIGHTS.header,
    hasTextCenterOnFirstColumn = false,
    onRowClick,
  } = props;

  const { t } = useTranslation("common");

  const noRowsRenderer = () => {
    const isFetched = data;

    return (
      <div
        className={classNames("flex flex-col gap-4 justify-center items-center w-full h-full bg-gray-100 text-displaySm text-gray-500", {
          "rounded-b-xl": !isFetched,
        })}
      >
        <span className={classNames(!isFetched && "animate-pulse-slow")}>{!isFetched ? t("loading") : t("no_data")}</span>
        {isFetched && <span className="text-sm font-normal text-gray-400">Please change time period or generate a report.</span>}
      </div>
    );
  };

  return (
    <AutoSizer defaultHeight={340} disableHeight>
      {({ width }) => (
        <Table
          width={width}
          height={340}
          headerHeight={headerHeight}
          rowHeight={rowHeight}
          rowCount={data?.length || 0}
          rowGetter={({ index }) => data?.[index]}
          className="bg-white rounded-lg text-xs"
          headerClassName={classNames("!m-0 text-sm font-normal text-gray-400 flex items-center normal-case justify-center", {
            "first:justify-start": !hasTextCenterOnFirstColumn,
          })}
          rowClassName={({ index }: { index: number }) =>
            classnames("border-b border-gray-200", "text-center", index !== -1 && "hover:bg-gray-50 cursor-pointer")
          }
          noRowsRenderer={noRowsRenderer}
          onRowClick={onRowClick}
        >
          {columnData.map((data, index) => (
            <Column
              key={data.dataKey}
              label={data.label}
              dataKey={data.dataKey}
              flexGrow={data.columnWidth ? 0 : 1}
              width={data.columnWidth || 100}
              className={classNames("!m-0 text-gray-400 !font-normal", {
                "flex justify-center": hasTextCenterOnFirstColumn && index !== 0,
              })}
              cellRenderer={({ cellData, rowData }) => (data.cellRenderer ? data.cellRenderer(cellData, rowData) : cellData)}
            />
          ))}
        </Table>
      )}
    </AutoSizer>
  );
};

interface CustomTableProps {
  width?: number;
  height?: number;
  headerHeight?: number;
  rowHeight?: number;
  data?: any[] | null;
  columnData: Array<{
    dataKey: string;
    label: string;
    columnWidth?: number;
    cellRenderer?: (cellData: any, rowData: any) => ReactNode;
  }>;
  isLoading?: boolean;
  onRowClick?: (rowData: any) => void;
  hasTextCenterOnFirstColumn?: boolean;
}

export default CustomTable;
