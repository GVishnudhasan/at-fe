import ProjectAwarenessTemplate from '@/components/templates/ProjectAwarenessTemplate';
import { AppConfig } from '@/config';
import useDataTableLogics from '@/hooks/useDataTableLogics';
import { tableWiseDefaultData } from '@/utils/defaultTableWiseData';
import { columnWiseListForFilter } from '@/utils/filterListTableWise';
import type { PassedPropType } from '@/utils/typeUtils';
import { uploadFormInputsWithLabelAndKey } from '@/utils/uploadInputsTableWise';

import ModalWrapper from '../organisms/ModalWrapper';

const { tableRelations } = AppConfig;

const defaultTableData =
  tableWiseDefaultData?.projectAwarenessProgramDefaultData;

const ProjectAwarenessPage = () => {
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
    tableRelations?.projectAwarenessProgramPage
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
        columnWiseListForFilter?.projectAwarenessProgramDefaultData
      }
      uploadFormInputsWithLabelAndKey={
        uploadFormInputsWithLabelAndKey?.projectAwarenessProgramDefaultData
      }
      handleFileUpload={handleFileUpload}
      handleAttachmentsAndImgUpload={handleAttachmentsAndImgUpload}
      appliedFilter={appliedFilter}
    >
      <ProjectAwarenessTemplate {...(passAsProps as any)} />
    </ModalWrapper>
  );
};

export default ProjectAwarenessPage;
