import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import ReportsPage from '@/components/pages/ReportsPage';
import type { ReqDatType } from '@/components/templates/ReportsTemplate';
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

const ReportsRoute = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <ReportsPage data={data} />;
};

export const getServerSideProps: GetServerSideProps<{
  data: ReqDatType;
}> = async () => {
  const data = await api.get('/api/reports');
  if (isMockTableResponse(data)) {
    return { props: { data: data?.response?.response } };
  }
  return { props: { data: [] } };
};

export default ReportsRoute;
