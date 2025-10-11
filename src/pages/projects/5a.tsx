import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import Project5aPage from '@/components/pages/5aPage';
import type { ReqDatType } from '@/components/templates/Project5aTemplate';
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

const Project5aRoute = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <Project5aPage data={data} />;
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

export default Project5aRoute;
