import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import EcrcPage from '@/components/pages/EcrcPage';
import type { ReqDatType } from '@/components/templates/EcrcTemplate';
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

const EcrcRoute = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <EcrcPage data={data} />;
};

export const getServerSideProps: GetServerSideProps<{
  data: ReqDatType;
}> = async () => {
  const data = await api.get('/api/ecrc');
  if (isMockTableResponse(data)) {
    return { props: { data: data?.response?.response } };
  }
  return { props: { data: [] } };
};

export default EcrcRoute;
