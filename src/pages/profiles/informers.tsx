import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import ProfileInformersPage from '@/components/pages/ProfileInformers';
import type { ReqDatType } from '@/components/templates/ProfileInformersTemplate';
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

const ProfileInformersPageRoute = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <ProfileInformersPage data={data} />;
};

export const getServerSideProps: GetServerSideProps<{
  data: ReqDatType;
}> = async () => {
  const data = await api.get('/api/profileInformers');
  if (isMockTableResponse(data)) {
    return { props: { data: data?.response?.response } };
  }
  return { props: { data: [] } };
};

export default ProfileInformersPageRoute;
