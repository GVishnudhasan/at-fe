import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import OutPatientServicePage from '@/components/pages/OutPatientServicePage';
import type { ReqDatType } from '@/components/templates/OutPatientServiceTemplate';
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

const OutPatientServiceRoute = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <OutPatientServicePage data={data} />;
};

export const getServerSideProps: GetServerSideProps<{
  data: ReqDatType;
}> = async () => {
  const data = await api.get('/api/outpatientService');
  if (isMockTableResponse(data)) {
    return { props: { data: data?.response?.response } };
  }
  return { props: { data: [] } };
};

export default OutPatientServiceRoute;
