import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import TabsBodySection from '@/components/molecules/TabsBodySection';
import ModalWrapper from '@/components/organisms/ModalWrapper';
import type {
  FoodSectionDetailType,
  SectionDataPropsType,
} from '@/components/templates/ProjectRehabTemplate';
import { AppConfig } from '@/config';
import useDataTableLogics from '@/hooks/useDataTableLogics';
import { tableWiseDefaultData } from '@/utils/defaultTableWiseData';
import { columnWiseListForFilter } from '@/utils/filterListTableWise';
import type { PassedPropType } from '@/utils/typeUtils';
import { uploadFormInputsWithLabelAndKey } from '@/utils/uploadInputsTableWise';

const { rehabTabsParams, tableRelations, shelterTabsParams } = AppConfig;

type TabDetailsPropTypes = {
  name: string;
  value: string;
  isActive: boolean;
};

interface TabsSectionPropsType {
  activeTab: string;
  sectionData?: SectionDataPropsType;
  foodSectionData?: FoodSectionDetailType[];
  tabs: (activeTab: string) => TabDetailsPropTypes[];
}

type DefaultTableDataMapping = {
  [key: string]: object;
};

type DefaultTableRelationMapping = {
  [key: string]: string;
};

type DefaultColumnWiseListForFilterMapping = {
  [key: string]: string[][] | (() => string[][]);
};

type DefaultUploadFormInputsWithLabelAndKeyTabWiseMapping = {
  [key: string]: (() => string[][]) | string[][];
};

const defaultCurrentTabData = {
  defaultTableData: {},
  currentTableRelations: '',
  columnWiseListForFilter: [['', '']],
  uploadInputFormLabelAndKey: [['', '']],
};

const TabsSection = ({
  activeTab = '',
  sectionData = [],
  foodSectionData = [],
  tabs = () => [],
}: TabsSectionPropsType) => {
  const pathname = usePathname();

  const defaultTableData: DefaultTableDataMapping = {
    [shelterTabsParams.clients]:
      tableWiseDefaultData?.projectGobiShelterDefaultData,
    [rehabTabsParams.clients]:
      tableWiseDefaultData?.projectRehabilitationHomeClientsDefaultData,
    [rehabTabsParams.activityTracker]:
      tableWiseDefaultData?.projectRehabilitationHomeActivityTrackerDefaultData,
    [rehabTabsParams.foodMenu]:
      tableWiseDefaultData?.projectRehabilitationHomeFoodMenuDefaultData,
    [rehabTabsParams.visitors]:
      tableWiseDefaultData?.projectRehabilitationHomeVisitorsDefaultData,
  };

  const tableRelationsTabWise: DefaultTableRelationMapping = {
    [shelterTabsParams.clients]: tableRelations?.projectGobiShelterPage,
    [rehabTabsParams.clients]:
      tableRelations?.projectRehabilitationHomeClientsPage,
    [rehabTabsParams.activityTracker]:
      tableRelations?.projectRehabilitationHomeActivityTrackerPage,
    [rehabTabsParams.foodMenu]:
      tableRelations?.projectRehabilitationHomeFoodMenuPage,
    [rehabTabsParams.visitors]:
      tableRelations?.projectRehabilitationHomeVisitorsPage,
  };

  const columnWiseListForFilterTabWise = {
    [shelterTabsParams.clients]: (header) =>
      columnWiseListForFilter?.projectGobiShelterDefaultData(header),
    [rehabTabsParams.clients]: (header) =>
      columnWiseListForFilter?.projectRehabilitationHomeClientsDefaultData(
        header
      ),
    [rehabTabsParams.activityTracker]: (header) =>
      columnWiseListForFilter?.projectRehabilitationHomeActivityTrackerDefaultData(
        header
      ),
    [rehabTabsParams.foodMenu]:
      columnWiseListForFilter?.projectRehabilitationHomeFoodMenuDefaultData,
    [rehabTabsParams.visitors]: (header) =>
      columnWiseListForFilter?.projectRehabilitationHomeVisitorsDefaultData(
        header
      ),
  };

  const uploadFormInputsWithLabelAndKeyTabWise = {
    [shelterTabsParams.clients]: (header) =>
      uploadFormInputsWithLabelAndKey?.projectGobiShelterDefaultData(header),
    [rehabTabsParams.clients]: (header) =>
      uploadFormInputsWithLabelAndKey?.projectRehabilitationHomeClientsDefaultData(
        header
      ),
    [rehabTabsParams.activityTracker]: (header) =>
      uploadFormInputsWithLabelAndKey?.projectRehabilitationHomeActivityTrackerDefaultData(
        header
      ),
    [rehabTabsParams.foodMenu]:
      uploadFormInputsWithLabelAndKey?.projectRehabilitationHomeFoodMenuDefaultData,
    [rehabTabsParams.visitors]: (header) =>
      uploadFormInputsWithLabelAndKey?.projectRehabilitationHomeVisitorsDefaultData(
        header
      ),
  };

  const [currentTabData, setCurrentTabData] = useState(defaultCurrentTabData);

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
    currentTabData?.defaultTableData,
    currentTabData?.currentTableRelations
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

  useEffect(() => {
    const columnWiseListForFilter = (typeof columnWiseListForFilterTabWise[
      activeTab
    ] === 'function'
      ? columnWiseListForFilterTabWise[activeTab](tableHeader)
      : columnWiseListForFilterTabWise[activeTab]) || [['', '']];

    const uploadInputFormLabelAndKey =
      (!!uploadFormInputsWithLabelAndKeyTabWise[activeTab] &&
      typeof uploadFormInputsWithLabelAndKeyTabWise[activeTab] === 'function'
        ? uploadFormInputsWithLabelAndKeyTabWise[activeTab](tableHeader)
        : uploadFormInputsWithLabelAndKeyTabWise[activeTab]) || [['', '']];

    setCurrentTabData({
      defaultTableData: defaultTableData[activeTab] || {},
      currentTableRelations: tableRelationsTabWise[activeTab] || '',
      columnWiseListForFilter,
      uploadInputFormLabelAndKey,
    });
  }, [activeTab, tableHeader]);

  useEffect(() => {
    applyFilter([]);
  }, [activeTab]);

  return (
    <div className="flex h-full flex-col">
      <div className="h-[88%] md:h-[82%] lg:h-[90%]">
        <ModalWrapper
          tableData={tableData}
          applyFilter={applyFilter}
          columnWiseListForFilter={currentTabData?.columnWiseListForFilter}
          uploadFormInputsWithLabelAndKey={
            currentTabData?.uploadInputFormLabelAndKey
          }
          handleFileUpload={handleFileUpload}
          handleAttachmentsAndImgUpload={handleAttachmentsAndImgUpload}
          appliedFilter={appliedFilter}
        >
          <TabsBodySection
            activeTab={activeTab}
            sectionData={sectionData}
            foodSectionData={foodSectionData}
            {...(passAsProps as any)}
          >
            <div className="mb-3 flex h-fit items-center justify-start pt-6 text-sm font-standard">
              {tabs(
                activeTab && !Array.isArray(activeTab)
                  ? activeTab
                  : rehabTabsParams.activityTracker
              )?.map((tab) => (
                <Link
                  key={tab.value}
                  href={{
                    pathname,
                    query: { tabSection: tab.value },
                  }}
                >
                  <div
                    className={`mr-3 border-b-2 ${
                      tab?.isActive ? 'border-light-blue' : 'border-transparent'
                    } px-5 py-2`}
                  >
                    {tab.name}
                  </div>
                </Link>
              ))}
            </div>
          </TabsBodySection>
        </ModalWrapper>
      </div>
    </div>
  );
};

export default TabsSection;
