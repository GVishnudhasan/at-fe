import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import ProfileOtherHomesPage from '@/components/pages/ProfileOtherHomesPage';
import type { ReqDatType } from '@/components/templates/ProfileOtherHomesTemplate';
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

const ProfileOtherHomesRoute = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <ProfileOtherHomesPage data={data} />;
};

export const getServerSideProps: GetServerSideProps<{
  data: ReqDatType;
}> = async () => {
  const data = await api.get('/api/profileOtherHomes');
  if (isMockTableResponse(data)) {
    return { props: { data: data?.response?.response } };
  }
  return { props: { data: [] } };
};

export default ProfileOtherHomesRoute;
