import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import ProjectAwarenessPage from '@/components/pages/ProjectAwarenessPage';
import type { ReqDatType } from '@/components/templates/ProjectAwarenessTemplate';
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

const ProjectAwarenessRoute = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <ProjectAwarenessPage data={data} />;
};

export const getServerSideProps: GetServerSideProps<{
  data: ReqDatType;
}> = async () => {
  const data = await api.get('/api/projectAwarness');
  if (isMockTableResponse(data)) {
    return { props: { data: data?.response?.response } };
  }
  return { props: { data: [] } };
};

export default ProjectAwarenessRoute;
