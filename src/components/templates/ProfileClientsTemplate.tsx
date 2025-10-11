import ClientDetailsSection from '@/components/molecules/ClientDetailsSection';
import PageHeaderSection from '@/components/molecules/PageHeaderSection';
import type { TemplateType } from '@/utils/typeUtils';

const ProfileClientsTemplate = ({
  appliedFilter = [],
  tableData,
  // totalCount,
  // selectedData,
  modifiedData,
  loading,
  responseStatus,
  removeAll,
  handleRemoveAll,
  handleResetRemoveAll,
  // currentPage,
  // limit,
  handlePageIncrement,
  // handlePageDecrement,
  handleFileUpload,
  handleTableSync,
  // handleSelectDeselectSingleData,
  // handleSelectDeselectAllData,
  handleRowEdit,
  handleModalOpen,
  handleUploadModalOpen,
  triggerTableDownload,
}: TemplateType) => {
  return (
    <div className="mx-auto mt-12 h-full w-[85%] md:w-[95%]">
      <PageHeaderSection
        pageTitle="Clients"
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
      <ClientDetailsSection
        clientsData={tableData}
        handleRowEdit={handleRowEdit}
        modifiedData={modifiedData}
        handleTableSync={handleTableSync}
        handlePageIncrement={handlePageIncrement}
        handleResetRemoveAll={handleResetRemoveAll}
        shouldEmptyArray={removeAll}
      />
    </div>
  );
};

export default ProfileClientsTemplate;
