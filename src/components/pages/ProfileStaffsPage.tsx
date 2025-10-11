import ModalWrapper from '@/components/organisms/ModalWrapper';
import ProfileStaffsTemplate from '@/components/templates/ProfileStaffsTemplate';
import { AppConfig } from '@/config';
import useDataTableLogics from '@/hooks/useDataTableLogics';
import { tableWiseDefaultData } from '@/utils/defaultTableWiseData';
import { columnWiseListForFilter } from '@/utils/filterListTableWise';
import type { PassedPropType } from '@/utils/typeUtils';
import { uploadFormInputsWithLabelAndKey } from '@/utils/uploadInputsTableWise';

const { tableRelations } = AppConfig;

const defaultTableData = tableWiseDefaultData?.profilesStaffsDefaultData;

const ProfileStaffsPage = () => {
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
  } = useDataTableLogics(defaultTableData, tableRelations?.profilesStaffsPage);

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
        columnWiseListForFilter?.profilesStaffsDefaultData
      }
      uploadFormInputsWithLabelAndKey={
        uploadFormInputsWithLabelAndKey?.profilesStaffsDefaultData
      }
      handleFileUpload={handleFileUpload}
      handleAttachmentsAndImgUpload={handleAttachmentsAndImgUpload}
      appliedFilter={appliedFilter}
    >
      <ProfileStaffsTemplate {...(passAsProps as any)} />
    </ModalWrapper>
  );
};

export default ProfileStaffsPage;
