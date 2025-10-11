import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import ProfileStaffsPage from '@/components/pages/ProfileStaffsPage';
import type { ReqDatType } from '@/components/templates/ProfileStaffsTemplate';
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

const ProfileStaffsRoute = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <ProfileStaffsPage data={data} />;
};

export const getServerSideProps: GetServerSideProps<{
  data: ReqDatType;
}> = async () => {
  const data = await api.get('/api/profileVolunteers');
  if (isMockTableResponse(data)) {
    return { props: { data: data?.response?.response } };
  }
  return { props: { data: [] } };
};

export default ProfileStaffsRoute;
