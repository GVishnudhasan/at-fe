import Spinner from '@/components/atoms/Loader/Spinner';
import PageHeaderSection from '@/components/molecules/PageHeaderSection';
import TableSection from '@/components/molecules/TableSection';
import { profileInformersDataKeys } from '@/utils/tableDataUtils';
import type { TemplateType } from '@/utils/typeUtils';

const ProfileInformersTemplate = ({
  appliedFilter = [],
  tableData,
  totalCount,
  selectedData,
  modifiedData,
  loading,
  responseStatus,
  currentPage,
  limit,
  tableHeader,
  removeAll,
  handleRemoveAll,
  handleResetRemoveAll,
  handleTableHeaderEdit,
  handlePageIncrement,
  handlePageDecrement,
  handleFileUpload,
  handleTableSync,
  handleSelectDeselectSingleData,
  handleSelectDeselectAllData,
  handleRowEdit,
  handleModalOpen,
  handleUploadModalOpen,
  triggerTableDownload,
  handleAttachmentsAndImgUpload,
}: TemplateType) => {
  return (
    <div className="mx-auto mt-12 h-full w-[85%] md:w-[95%]">
      <PageHeaderSection
        pageTitle="Informers"
        handleFileUpload={handleFileUpload}
        isUploadLoading={loading?.tableUploadLoading}
        isUploadStatus={responseStatus?.tableUploadStatus}
        handleModalOpen={handleModalOpen}
        handleUploadModalOpen={handleUploadModalOpen}
        triggerTableDownload={triggerTableDownload}
        isDownloadLoading={loading?.tableDownloading}
        appliedFiltersCount={appliedFilter.length}
        handleRemoveAll={handleRemoveAll}
      />

      {modifiedData?.length ? (
        <div className="mb-4">
          {modifiedData?.length} data {modifiedData?.length >= 2 ? 'are' : 'is'}{' '}
          <span className="font-bold text-blue">modified</span>, please{' '}
          <button
            type="button"
            className="bg-blue px-2 py-px font-bold text-white"
            onClick={handleTableSync}
          >
            click
          </button>{' '}
          to sync
        </div>
      ) : null}

      {selectedData?.length ? (
        <div className="mb-4">{selectedData?.length} data are selected</div>
      ) : null}

      {!loading?.tableLoading || true ? (
        <TableSection
          pageTitle="Informers"
          handleSelectDeselectSingleData={handleSelectDeselectSingleData}
          handleSelectDeselectAllData={handleSelectDeselectAllData}
          handleRowEdit={handleRowEdit}
          handleTableHeaderEdit={handleTableHeaderEdit}
          tableHeaders={tableHeader}
          tableRowWiseData={tableData}
          tableDataKeys={profileInformersDataKeys}
          totalCols={tableHeader.length}
          totalCount={totalCount}
          currentPage={currentPage}
          limit={limit}
          handlePageIncrement={handlePageIncrement}
          handlePageDecrement={handlePageDecrement}
          shouldEmptyArray={removeAll}
          handleResetRemoveAll={handleResetRemoveAll}
          loading={loading?.tableLoading}
          handleAttachmentsAndImgUpload={handleAttachmentsAndImgUpload}
        />
      ) : (
        <div className="flex h-[65%] w-full items-center justify-center rounded-md border">
          <Spinner size="h-8 w-8" borderColor="border-blue/30 border-t-blue" />
        </div>
      )}
    </div>
  );
};

export default ProfileInformersTemplate;
