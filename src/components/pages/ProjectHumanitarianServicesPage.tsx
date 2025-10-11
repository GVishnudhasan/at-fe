import ModalWrapper from '@/components/organisms/ModalWrapper';
import ProjectHumanitarianServicesTemplate from '@/components/templates/ProjectHumanitarianServicesTemplate';
import { AppConfig } from '@/config';
import useDataTableLogics from '@/hooks/useDataTableLogics';
import { tableWiseDefaultData } from '@/utils/defaultTableWiseData';
import { columnWiseListForFilter } from '@/utils/filterListTableWise';
import type { PassedPropType } from '@/utils/typeUtils';
import { uploadFormInputsWithLabelAndKey } from '@/utils/uploadInputsTableWise';

const { tableRelations } = AppConfig;

const defaultTableData =
  tableWiseDefaultData?.projectHumanitarianServicesDefaultData;

const ProjectHumanitarianServicesPage = () => {
  const {
    appliedFilter,
    tableData,
    totalCount,
    selectedData,
    modifiedData,
    loading,
    responseStatus,
    currentPage,
    limit,
    tableHeader,
    handleTableHeaderEdit,
    handlePageIncrement,
    handlePageDecrement,
    handleFileUpload,
    handleTableSync,
    handleSelectDeselectSingleData,
    handleSelectDeselectAllData,
    handleRowEdit,
    applyFilter,
    handleAttachmentsAndImgUpload,
    triggerTableDownload,
  } = useDataTableLogics(
    defaultTableData,
    tableRelations?.projectHumanitarianServicesPage
  );

  const passAsProps: PassedPropType = {
    appliedFilter,
    tableData,
    totalCount,
    selectedData,
    modifiedData,
    loading,
    responseStatus,
    currentPage,
    limit,
    tableHeader,
    handleTableHeaderEdit,
    handlePageIncrement,
    handlePageDecrement,
    handleFileUpload,
    handleTableSync,
    handleSelectDeselectSingleData,
    handleSelectDeselectAllData,
    handleRowEdit,
    applyFilter,
    handleAttachmentsAndImgUpload,
    triggerTableDownload,
  };
  return (
    <ModalWrapper
      tableData={tableData}
      applyFilter={applyFilter}
      columnWiseListForFilter={
        columnWiseListForFilter?.projectHumanitarianServicesDefaultData
      }
      uploadFormInputsWithLabelAndKey={
        uploadFormInputsWithLabelAndKey?.projectHumanitarianServicesDefaultData
      }
      handleFileUpload={handleFileUpload}
      handleAttachmentsAndImgUpload={handleAttachmentsAndImgUpload}
      appliedFilter={appliedFilter}
    >
      <ProjectHumanitarianServicesTemplate {...(passAsProps as any)} />
    </ModalWrapper>
  );
};

export default ProjectHumanitarianServicesPage;
