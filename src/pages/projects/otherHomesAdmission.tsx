import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import AdmittedOtherHomesPage from '@/components/pages/AdmittedOtherHomesPage';
import type { ReqDatType } from '@/components/templates/AdmittedOtherHomesTemplate';
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

const OtherHomesAdmissionRoute = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <AdmittedOtherHomesPage data={data} />;
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

export default OtherHomesAdmissionRoute;
