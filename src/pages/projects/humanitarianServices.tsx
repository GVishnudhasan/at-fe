import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import ProjectHumanitarianServicesPage from '@/components/pages/ProjectHumanitarianServicesPage';
import type { ReqDatType } from '@/components/templates/ProjectHumanitarianServicesTemplate';
import api from '@/services/api';

type MockTableResponse = {
  response: {
    response: ReqDatType;
  };
};
export const isMockTableResponse = (
  response: any
): response is MockTableResponse => {
  return response && response.response && response.response.response;
};

const ProjectHumanitarianServicesRoute = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <ProjectHumanitarianServicesPage data={data} />;
};

export const getServerSideProps: GetServerSideProps<{
  data: ReqDatType;
}> = async () => {
  const data = await api.get('/api/projectHumanitarianServices');
  if (isMockTableResponse(data)) {
    return { props: { data: data?.response?.response } };
  }
  return { props: { data: [] } };
};

export default ProjectHumanitarianServicesRoute;
