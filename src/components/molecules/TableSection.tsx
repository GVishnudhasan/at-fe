/* eslint-disable import/no-extraneous-dependencies */
import domToPdf from 'dom-to-pdf';
import { type Dispatch, type SetStateAction } from 'react';

import FieldEditBox from '@/components/atoms/FieldEditBox';
import BarLoaderInfinite from '@/components/atoms/Loader/BarLoaderInfinite';
import TableBodyDataSection from '@/components/molecules/TableBodyDataSection';
import { detailViewHtml } from '@/components/templates/DetailViewTemplate';
import useInfinteScroll from '@/hooks/useInfiniteScroll';
// import { AppConfig } from '@/config';
import { adminApprovalStatus } from '@/utils/tableDataUtils';

// const { routes } = AppConfig;

interface RowWiseData {
  [name: string]: any;
}

interface DataKeysType {
  key: string;
  type: string;
  len: string;
  fieldType?: string;
}

type TableSectionParams = {
  pageTitle: string;
  tableHeaders: string[];
  tableRowWiseData: RowWiseData[];
  tableDataKeys: DataKeysType[];
  totalCols?: number;
  noSelection?: boolean;
  // totalCount: number;
  // currentPage: number;
  // limit: number;
  shouldEmptyArray: boolean;
  loading: boolean;
  handleResetRemoveAll: () => void;
  handleSelectDeselectSingleData?: (
    e: React.ChangeEvent,
    rowData: RowWiseData,
    cb: Dispatch<SetStateAction<RowWiseData[]>>
  ) => void;
  handleSelectDeselectAllData?: (
    e: React.ChangeEvent,
    cb: Dispatch<SetStateAction<RowWiseData[]>>
  ) => void;
  handlePageIncrement: () => void;
  handleAttachmentsAndImgUpload:
    | ((file: File) => Promise<{ error: boolean; msg: string }>)
    | undefined;
  // handlePageDecrement: () => void;
  handleRowEdit?: (
    modifiedRowData: RowWiseData,
    key: string,
    value: any
  ) => void;
  handleTableHeaderEdit: (index: number, updatedStr: string | string[]) => void;
};

const TableSection = ({
  pageTitle = '',
  tableHeaders = [],
  tableRowWiseData = [],
  tableDataKeys = [],
  totalCols = 10,
  noSelection = false,
  // totalCount = 200,
  // currentPage,
  // limit,
  shouldEmptyArray,
  loading = false,
  handleResetRemoveAll,
  handleTableHeaderEdit,
  handleSelectDeselectSingleData,
  handleSelectDeselectAllData,
  handleRowEdit,
  // handlePageDecrement,
  handlePageIncrement,
  handleAttachmentsAndImgUpload,
}: TableSectionParams) => {
  const { tableRow, setTableRow, setRef } = useInfinteScroll({
    tableRowWiseData,
    shouldEmptyArray,
    handlePageIncrement,
    handleResetRemoveAll,
  });

  const handleDownload = (e, row) => {
    const targetElement = detailViewHtml({ ...row, pageTitle });
    const options = {
      filename: `${
        row?.client_name ||
        row?.visitor_name ||
        row?.homeless_person_name ||
        row?.informer_name ||
        pageTitle
      }.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
    };
    domToPdf(targetElement, options);
  };

  return (
    <table
      ref={setRef}
      className="relative block max-h-[60%] w-full border-separate overflow-auto rounded-xl border text-xs md:max-h-[70%]"
    >
      <thead className="sticky top-0 z-100 w-full bg-white">
        <tr className="absolute left-0 top-[100%] w-full">
          {loading && <BarLoaderInfinite />}
        </tr>
        <tr className="w-full">
          {tableHeaders.map((header, i) => {
            const handleCheckBoxChange = (e) =>
              handleSelectDeselectAllData &&
              handleSelectDeselectAllData(e, setTableRow || (() => {}));
            return header === 'Select Action' && !noSelection ? (
              <th
                key={header}
                className="whitespace-nowrap border-b border-light-gray px-3.5 py-6.5"
                style={{ width: `${(1 / (totalCols + 1)) * 100}%` }}
              >
                <input
                  type="checkbox"
                  className="block px-3.5 py-6.5"
                  onChange={handleCheckBoxChange}
                />
              </th>
            ) : (
              <th
                key={header}
                className="whitespace-nowrap border-b border-light-gray px-3.5 py-6.5"
                style={{ width: `${(1 / (totalCols + 1)) * 100}%` }}
              >
                <FieldEditBox
                  header
                  value={header}
                  handleUpdate={(val) => {
                    handleTableHeaderEdit(i, val);
                  }}
                />
                <div className="mt-2 font-thick text-blue">{`${
                  tableDataKeys[i - 1]?.fieldType || tableDataKeys[i - 1]?.type
                } ${
                  tableDataKeys[i - 1]?.len && `(${tableDataKeys[i - 1]?.len})`
                }`}</div>
              </th>
            );
          })}
          <th
            className="whitespace-nowrap border-b border-light-gray px-3.5 py-6.5"
            style={{ width: `${(1 / (totalCols + 1)) * 100}%` }}
          >
            Download Single Row
            <div className="mt-2 font-thick text-blue">cta</div>
          </th>
        </tr>
      </thead>
      <tbody className="w-full">
        {tableRow.map((row) => {
          const handleSelection = (e) =>
            !noSelection && handleSelectDeselectSingleData
              ? handleSelectDeselectSingleData(e, row, setTableRow)
              : null;
          const handleDownloadClick = (e) => handleDownload(e, row);
          return (
            <tr
              key={row?.id || Math.random()}
              className={`w-full ${
                row.approval_status && adminApprovalStatus[row.approval_status]
              } ${row?.modified ? 'outline outline-2 outline-blue' : ''}`}
            >
              {!noSelection && (
                <td className="border-spacing-0 whitespace-nowrap border-b border-light-gray px-3.5 py-6.5 text-center">
                  <input
                    onChange={handleSelection}
                    type="checkbox"
                    checked={row?.select}
                  />
                </td>
              )}
              {tableDataKeys.map(({ key = '', type = '' }) => {
                const extraPayload = { rowData: row, key };
                return (
                  <td
                    key={key}
                    className="min-w-[140px] border-spacing-0 whitespace-nowrap border-b border-light-gray px-3.5 py-6.5 text-center"
                    style={{
                      width: `${(1 / (totalCols + 1)) * 100}%`,
                    }}
                  >
                    <TableBodyDataSection
                      bodyDataType={type}
                      bodyDataValue={row[key]}
                      extraPayload={extraPayload}
                      handleRowEdit={handleRowEdit || (() => {})}
                      handleAttachmentsAndImgUpload={
                        handleAttachmentsAndImgUpload
                      }
                    />
                  </td>
                );
              })}
              <td
                className="border-spacing-0 whitespace-nowrap border-b border-light-gray px-3.5 py-6.5 text-center"
                style={{
                  width: `${(1 / (totalCols + 1)) * 100}%`,
                }}
              >
                <button
                  className="rounded-md bg-blue px-2 py-1 font-thick text-white"
                  type="button"
                  onClick={handleDownloadClick}
                >
                  {/* <Link
                    href={{
                      pathname: routes.detailView,
                      query: { ...row, pageTitle },
                    }}
                  > */}
                  Download
                  {/* </Link> */}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
      {/* <tfoot className="sticky bottom-0 left-0 block w-full bg-white px-4 py-2">
        <tr className="flex w-full items-center justify-end">
          <td className="flex items-center justify-end">
            <div className="mr-6">
              <span className="font-bold text-blue">
                {totalCount < 1
                  ? totalCount || 0
                  : 1 + limit * (currentPage - 1)}{' '}
                -{' '}
                {limit * currentPage > totalCount
                  ? totalCount
                  : limit * currentPage}
              </span>
              <span className="mx-2">of</span>
              <span className="font-thick">{totalCount}</span>
            </div>
            <button
              type="button"
              className="mr-2 cursor-pointer rounded-full px-2 py-px text-lg hover:bg-slate-200"
              onClick={handlePageDecrement}
            >
              {'<'}
            </button>
            <button
              type="button"
              className="mr-8 cursor-pointer rounded-full px-2 py-px text-lg hover:bg-slate-200"
              onClick={handlePageIncrement}
            >
              {'>'}
            </button>
          </td>
        </tr>
      </tfoot> */}
    </table>
  );
};

export default TableSection;
