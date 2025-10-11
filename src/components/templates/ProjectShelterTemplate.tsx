import { useRouter } from 'next/router';

import TabsSection from '@/components/molecules/TabsSection';
import { AppConfig } from '@/config';
import { shelterTabs } from '@/utils/navUtils';

const { shelterTabsParams } = AppConfig;

type SectionDetailActivityTrackerDataType = {
  id: string;
  clientName: string;
  foodTaken: Date;
  exerciseDone: string;
  groomingDone: string;
  readingActivityDone: string;
  remarks: string;
};

type SectionDetailVisitorsDataType = {
  id: string;
  visitorName: string;
  locationOfVisit: string;
  staffAttended: string;
  dateOfVisit: string;
  purposeOfVisit: string;
};

export interface FoodTimeType {
  breakfast: string[];
  lunch: string[];
  dinner: string[];
}

export interface FoodSectionDetailType {
  id: string;
  day: string;
  color: string;
  foodTiming: FoodTimeType;
}

export interface SectionDataType {
  [name: string]:
    | SectionDetailActivityTrackerDataType
    | SectionDetailVisitorsDataType;
}

export type SectionDataPropsType = SectionDataType[];
export type FoodSectionDataPropsType = FoodSectionDetailType[];

interface ProjectShelterTemplatePropsType {
  data: SectionDataPropsType;
  foodSectionData: FoodSectionDataPropsType;
}

const ProjectShelterTemplate = ({
  data = [],
  foodSectionData = [],
}: ProjectShelterTemplatePropsType) => {
  const router = useRouter();
  const { tabSection = shelterTabsParams.clients } = router.query;
  return (
    <TabsSection
      activeTab={typeof tabSection === 'string' ? tabSection : ''}
      sectionData={data}
      foodSectionData={foodSectionData}
      tabs={shelterTabs}
    />
  );
};

export default ProjectShelterTemplate;
