import ModalWrapper from '@/components/organisms/ModalWrapper';
import OutPatientServiceTemplate from '@/components/templates/OutPatientServiceTemplate';
import { AppConfig } from '@/config';
import useDataTableLogics from '@/hooks/useDataTableLogics';
import { tableWiseDefaultData } from '@/utils/defaultTableWiseData';
import { columnWiseListForFilter } from '@/utils/filterListTableWise';
import type { PassedPropType } from '@/utils/typeUtils';
import { uploadFormInputsWithLabelAndKey } from '@/utils/uploadInputsTableWise';

const { tableRelations } = AppConfig;

const defaultTableData = tableWiseDefaultData?.outPatientServicesDefaultData;

const OutPatientServicePage = () => {
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
    tableRelations?.outPatientServicesPage
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
      columnWiseListForFilter={columnWiseListForFilter?.outPatientServicesDefaultData(
        tableHeader
      )}
      uploadFormInputsWithLabelAndKey={uploadFormInputsWithLabelAndKey?.outPatientServicesDefaultData(
        tableHeader
      )}
      handleFileUpload={handleFileUpload}
      handleAttachmentsAndImgUpload={handleAttachmentsAndImgUpload}
      appliedFilter={appliedFilter}
    >
      <OutPatientServiceTemplate {...(passAsProps as any)} />
    </ModalWrapper>
  );
};

export default OutPatientServicePage;
