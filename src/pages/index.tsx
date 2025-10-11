import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import DashboardPage from '@/components/pages/DashboardPage';
import {
  type DashboardDataTypes,
  defaultCounts,
} from '@/components/templates/DashboardTemplate';
import api from '@/services/api';

type MockTableResponse = {
  response: DashboardDataTypes;
};
export const isMockTableResponse = (
  response: any
): response is MockTableResponse => {
  return response && response.response;
};

const HomePageRoute = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <DashboardPage data={data} />;
};

export const getServerSideProps: GetServerSideProps<{
  data: DashboardDataTypes;
}> = async () => {
  const data = await api.get('/api/dashboard');
  if (isMockTableResponse(data)) {
    return { props: { data: data?.response } };
  }
  return { props: { data: defaultCounts } };
};

export default HomePageRoute;
