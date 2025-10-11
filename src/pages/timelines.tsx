import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import TimelinesPage from '@/components/pages/TimelinesPage';
import type { ReqDatType } from '@/components/templates/TimelinesTemplate';
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

const ProjectTimelinesRoute = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <TimelinesPage data={data} />;
};

export const getServerSideProps: GetServerSideProps<{
  data: ReqDatType;
}> = async () => {
  const data = await api.get('/api/timelines');
  if (isMockTableResponse(data)) {
    return { props: { data: data?.response?.response } };
  }
  return { props: { data: [] } };
};

export default ProjectTimelinesRoute;
