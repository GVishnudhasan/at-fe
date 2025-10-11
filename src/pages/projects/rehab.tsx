import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import ProjectRehabPage from '@/components/pages/ProjectRehabPage';
import type {
  FoodSectionDataPropsType,
  SectionDataPropsType,
} from '@/components/templates/ProjectRehabTemplate';
import { AppConfig } from '@/config';
import api from '@/services/api';

const { rehabTabsParams } = AppConfig;

type MockTableResponse<T> = {
  response: {
    response: T;
  };
};
const isMockTableResponse = (
  response: any
): response is MockTableResponse<SectionDataPropsType> => {
  return response && response.response && response.response.response;
};
const isMockTableFoodSectionResponse = (
  response: any
): response is MockTableResponse<FoodSectionDataPropsType> => {
  return response && response.response && response.response.response;
};

type UrlEndpointTypes = {
  [key: string]: string;
};

const ProjectRehabRoute = ({
  data,
  foodSectionData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <ProjectRehabPage data={data} foodSectionData={foodSectionData} />;
};

export const getServerSideProps: GetServerSideProps<{
  data?: SectionDataPropsType;
  foodSectionData?: FoodSectionDataPropsType;
}> = async ({ query }) => {
  const { tabSection = rehabTabsParams.activityTracker } = query;
  const urlEndpoint: UrlEndpointTypes = {
    [rehabTabsParams.clients]: '/api/projectRehabClients',
    [rehabTabsParams.activityTracker]: '/api/projectRehabActivityTracker',
    [rehabTabsParams.foodMenu]: '/api/projectRehabFoodMenu',
    [rehabTabsParams.visitors]: '/api/projectRehabVisitors',
  };
  if (!Array.isArray(tabSection) && urlEndpoint[tabSection]) {
    const data = await api.get(urlEndpoint[tabSection]);
    if (tabSection !== 'foodMenu') {
      if (isMockTableResponse(data)) {
        return { props: { data: data?.response?.response } };
      }
      return { props: { data: [] } };
    }
    if (isMockTableFoodSectionResponse(data)) {
      return { props: { foodSectionData: data?.response?.response } };
    }
    return { props: { foodSectionData: [] } };
  }

  return { props: { data: [] } };
};

export default ProjectRehabRoute;
