import LocationDetailsSection from '@/components/molecules/LocationDetailsSection';
import PageHeaderSection from '@/components/molecules/PageHeaderSection';
import type { TemplateType } from '@/utils/typeUtils';

type ProjectAwarenessDataType = {
  id: string;
};

export type ReqDatType = ProjectAwarenessDataType[];

const ProjectAwarenessTemplate = ({
  appliedFilter = [],
  tableData,
  // totalCount,
  // selectedData,
  modifiedData,
  loading,
  responseStatus,
  // currentPage,
  // limit,
  handlePageIncrement,
  // handlePageDecrement,
  removeAll,
  handleRemoveAll,
  handleResetRemoveAll,
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
        pageTitle="Awareness Program"
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
      <LocationDetailsSection
        locationsData={tableData}
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

export default ProjectAwarenessTemplate;
