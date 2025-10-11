import PageHeaderSection from '@/components/molecules/PageHeaderSection';
import VolunteerProfileDetailsSection from '@/components/molecules/VolunteerProfileDetailsSection';
import type { TemplateType } from '@/utils/typeUtils';

const ProfileVolunteersTemplate = ({
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
        pageTitle="Volunteers"
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
      <VolunteerProfileDetailsSection
        volunteersData={tableData}
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

export default ProfileVolunteersTemplate;
