import Spinner from '@/components/atoms/Loader/Spinner';
import type { FoodMenuType } from '@/components/molecules/FoodMenuSection';
import FoodMenuSection from '@/components/molecules/FoodMenuSection';
import PageHeaderSection from '@/components/molecules/PageHeaderSection';
import TableSection from '@/components/molecules/TableSection';
import { AppConfig } from '@/config';
import {
  projectRehabActivityTrackerDataKeys,
  projectRehabClientsDataKeys,
  projectRehabVisitorsDataKeys,
  projectShelterClientsDataKeys,
} from '@/utils/tableDataUtils';
import type { TemplateType } from '@/utils/typeUtils';

const { rehabTabsParams, shelterTabsParams } = AppConfig;

interface TabsBodySectionPropsType extends TemplateType {
  activeTab: string;
  children: React.ReactNode;
}

const TabsBodySection = ({
  appliedFilter = [],
  activeTab = '',
  children,
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
}: TabsBodySectionPropsType) => {
  if (activeTab === shelterTabsParams.clients) {
    return (
      <div className="mx-auto mt-12 h-full w-[85%] md:w-[95%]">
        <PageHeaderSection
          pageTitle="Gobi Shelter"
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
        {children}
        {modifiedData?.length ? (
          <div className="mb-4">
            {modifiedData?.length} data{' '}
            {modifiedData?.length >= 2 ? 'are' : 'is'}{' '}
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
            pageTitle="Gobi Shelter"
            handleSelectDeselectSingleData={handleSelectDeselectSingleData}
            handleSelectDeselectAllData={handleSelectDeselectAllData}
            handleRowEdit={handleRowEdit}
            tableHeaders={tableHeader}
            handleTableHeaderEdit={handleTableHeaderEdit}
            tableRowWiseData={tableData}
            tableDataKeys={projectShelterClientsDataKeys}
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
            <Spinner
              size="h-8 w-8"
              borderColor="border-blue/30 border-t-blue"
            />
          </div>
        )}
      </div>
    );
  }
  if (activeTab === rehabTabsParams.clients) {
    return (
      <div className="mx-auto mt-12 h-full w-[85%] md:w-[95%]">
        <PageHeaderSection
          pageTitle="Rehabilitation Home"
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
        {children}
        {modifiedData?.length ? (
          <div className="mb-4">
            {modifiedData?.length} data{' '}
            {modifiedData?.length >= 2 ? 'are' : 'is'}{' '}
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
            pageTitle="Clients"
            handleSelectDeselectSingleData={handleSelectDeselectSingleData}
            handleSelectDeselectAllData={handleSelectDeselectAllData}
            handleRowEdit={handleRowEdit}
            handleTableHeaderEdit={handleTableHeaderEdit}
            tableRowWiseData={tableData}
            totalCols={tableHeader.length}
            tableHeaders={tableHeader}
            tableDataKeys={projectRehabClientsDataKeys}
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
            <Spinner
              size="h-8 w-8"
              borderColor="border-blue/30 border-t-blue"
            />
          </div>
        )}
      </div>
    );
  }
  if (activeTab === rehabTabsParams.activityTracker) {
    return (
      <div className="mx-auto mt-12 h-full w-[85%] md:w-[95%]">
        <PageHeaderSection
          pageTitle="Rehabilitation Home"
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
        {children}
        {modifiedData?.length ? (
          <div className="mb-4">
            {modifiedData?.length} data{' '}
            {modifiedData?.length >= 2 ? 'are' : 'is'}{' '}
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
            pageTitle="Activity Tracker"
            handleSelectDeselectSingleData={handleSelectDeselectSingleData}
            handleSelectDeselectAllData={handleSelectDeselectAllData}
            handleRowEdit={handleRowEdit}
            tableRowWiseData={tableData}
            totalCols={tableHeader.length}
            tableHeaders={tableHeader}
            handleTableHeaderEdit={handleTableHeaderEdit}
            tableDataKeys={projectRehabActivityTrackerDataKeys}
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
            <Spinner
              size="h-8 w-8"
              borderColor="border-blue/30 border-t-blue"
            />
          </div>
        )}
      </div>
    );
  }
  if (activeTab === rehabTabsParams.foodMenu) {
    return (
      <div className="mx-auto mt-12 h-full w-[85%] md:w-[95%]">
        <PageHeaderSection
          pageTitle="Rehabilitation Home"
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
        {children}
        <FoodMenuSection foodMenuFromServer={tableData as FoodMenuType[]} />
      </div>
    );
  }
  if (activeTab === rehabTabsParams.visitors) {
    return (
      <div className="mx-auto mt-12 h-full w-[85%] md:w-[95%]">
        <PageHeaderSection
          pageTitle="Rehabilitation Home"
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
        {children}
        {modifiedData?.length ? (
          <div className="mb-4">
            {modifiedData?.length} data{' '}
            {modifiedData?.length >= 2 ? 'are' : 'is'}{' '}
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
            pageTitle="Visitors"
            handleSelectDeselectSingleData={handleSelectDeselectSingleData}
            handleSelectDeselectAllData={handleSelectDeselectAllData}
            handleRowEdit={handleRowEdit}
            handleTableHeaderEdit={handleTableHeaderEdit}
            tableRowWiseData={tableData}
            totalCols={tableHeader.length}
            tableHeaders={tableHeader}
            tableDataKeys={projectRehabVisitorsDataKeys}
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
            <Spinner
              size="h-8 w-8"
              borderColor="border-blue/30 border-t-blue"
            />
          </div>
        )}
      </div>
    );
  }

  return <div>No Data Found</div>;
};

export default TabsBodySection;
