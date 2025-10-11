import ModalWrapper from '@/components/organisms/ModalWrapper';
import ProfileInformersTemplate from '@/components/templates/ProfileInformersTemplate';
import { AppConfig } from '@/config';
import useDataTableLogics from '@/hooks/useDataTableLogics';
import { tableWiseDefaultData } from '@/utils/defaultTableWiseData';
import { columnWiseListForFilter } from '@/utils/filterListTableWise';
import type { PassedPropType } from '@/utils/typeUtils';
import { uploadFormInputsWithLabelAndKey } from '@/utils/uploadInputsTableWise';

const { tableRelations } = AppConfig;

const defaultTableData = tableWiseDefaultData?.profilesInformersDefaultData;

const ProfileInformersPage = () => {
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
    tableRelations?.profilesInformersPage
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
      columnWiseListForFilter={columnWiseListForFilter?.profilesInformersDefaultData(
        tableHeader
      )}
      uploadFormInputsWithLabelAndKey={uploadFormInputsWithLabelAndKey?.profilesInformersDefaultData(
        tableHeader
      )}
      handleFileUpload={handleFileUpload}
      handleAttachmentsAndImgUpload={handleAttachmentsAndImgUpload}
      appliedFilter={appliedFilter}
    >
      <ProfileInformersTemplate {...(passAsProps as any)} />
    </ModalWrapper>
  );
};

export default ProfileInformersPage;
