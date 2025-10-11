import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import EnquiriesPage from '@/components/pages/EnquiriesPage';
import type { ReqDatType } from '@/components/templates/EnquiriesTemplate';
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

const EnquiriesRoute = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <EnquiriesPage data={data} />;
};

export const getServerSideProps: GetServerSideProps<{
  data: ReqDatType;
}> = async () => {
  const data = await api.get('/api/enquires');
  if (isMockTableResponse(data)) {
    return { props: { data: data?.response?.response } };
  }
  return { props: { data: [] } };
};

export default EnquiriesRoute;
