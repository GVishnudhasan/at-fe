import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import FieldVisitPage from '@/components/pages/FieldVisitPage';
import type { ReqDatType } from '@/components/templates/FieldVisitTemplate';
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

const VisitsRoute = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <FieldVisitPage data={data} />;
};

export const getServerSideProps: GetServerSideProps<{
  data: ReqDatType;
}> = async () => {
  const data = await api.get('/api/fieldVisits');
  if (isMockTableResponse(data)) {
    return { props: { data: data?.response?.response } };
  }
  return { props: { data: [] } };
};

export default VisitsRoute;
