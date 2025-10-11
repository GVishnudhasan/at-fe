import { useRouter } from 'next/router';

import TabsSection from '@/components/molecules/TabsSection';
import { AppConfig } from '@/config';
import { rehabTabs } from '@/utils/navUtils';

const { rehabTabsParams } = AppConfig;

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

interface ProjectRehabTemplatePropsType {
  data: SectionDataPropsType;
  foodSectionData: FoodSectionDataPropsType;
}

const ProjectRehabTemplate = ({
  data = [],
  foodSectionData = [],
}: ProjectRehabTemplatePropsType) => {
  const router = useRouter();
  const { tabSection = rehabTabsParams.activityTracker } = router.query;
  return (
    <TabsSection
      activeTab={typeof tabSection === 'string' ? tabSection : ''}
      sectionData={data}
      foodSectionData={foodSectionData}
      tabs={rehabTabs}
    />
  );
};

export default ProjectRehabTemplate;
