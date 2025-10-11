import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import ProfileClientsPage from '@/components/pages/ProfileClientsPage';
import type { ReqDatType } from '@/components/templates/ProfileClientsTemplate';
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

const ProfileClientsRoute = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <ProfileClientsPage data={data} />;
};

export const getServerSideProps: GetServerSideProps<{
  data: ReqDatType;
}> = async () => {
  const data = await api.get('/api/profileClients');
  if (isMockTableResponse(data)) {
    return { props: { data: data?.response?.response } };
  }
  return { props: { data: [] } };
};

export default ProfileClientsRoute;
