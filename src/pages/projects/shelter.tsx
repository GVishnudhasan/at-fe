import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import ProjectShelterPage from '@/components/pages/ProjectShelterPage';
import type {
  FoodSectionDataPropsType,
  SectionDataPropsType,
} from '@/components/templates/ProjectRehabTemplate';
import { AppConfig } from '@/config';
import api from '@/services/api';

type MockTableResponse<T> = {
  response: {
    response: T;
  };
};
export const isMockTableResponse = (
  response: any
): response is MockTableResponse<SectionDataPropsType> => {
  return response && response.response && response.response.response;
};
export const isMockTableFoodResponse = (
  response: any
): response is MockTableResponse<FoodSectionDataPropsType> => {
  return response && response.response && response.response.response;
};

const { shelterTabsParams } = AppConfig;

type UrlEndpointTypes = {
  [key: string]: string;
};

const ProjectShelterRoute = ({
  data,
  foodSectionData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <ProjectShelterPage data={data} foodSectionData={foodSectionData} />;
};

export const getServerSideProps: GetServerSideProps<{
  data?: SectionDataPropsType;
  foodSectionData?: FoodSectionDataPropsType;
}> = async ({ query }) => {
  const { tabSection = shelterTabsParams.clients } = query;
  const urlEndpoint: UrlEndpointTypes = {
    [shelterTabsParams.clients]: '/api/projectShelterClients',
  };
  if (!Array.isArray(tabSection) && urlEndpoint[tabSection]) {
    const data = await api.get(urlEndpoint[tabSection]);
    if (tabSection !== 'foodMenu') {
      if (isMockTableResponse(data)) {
        return { props: { data: data?.response?.response } };
      }
      return { props: { data: [] } };
    }

    if (isMockTableFoodResponse(data)) {
      return { props: { foodSectionData: data?.response?.response } };
    }
    return { props: { foodSectionData: [] } };
  }

  return { props: { data: [] } };
};

export default ProjectShelterRoute;
