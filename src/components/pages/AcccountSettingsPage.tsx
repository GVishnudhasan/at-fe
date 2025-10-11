import { useEffect, useState } from 'react';

import type { UserAccessType } from '@/components/templates/AccountSettingsTemplate';
import AccountSettingsTemplate from '@/components/templates/AccountSettingsTemplate';
import { AppConfig } from '@/config';
import { apiCallToServer } from '@/services/api';
import useStore, { defaultLoginDetails } from '@/store';

const { reqEndPoints } = AppConfig;

interface ApiResponsetype {
  status: number;
  response: {
    error: boolean;
    msg: string;
    r: string;
    a: UserAccessType[];
  };
}

const responseTypeGuardFunc = (response: any): response is ApiResponsetype => {
  return (
    response &&
    typeof response.status === 'number' &&
    response.response &&
    typeof response.response.error === 'boolean' &&
    typeof response.response.msg === 'string'
  );
};

const AccountSettingsPage = () => {
  const { authToken, setLoginDetails } = useStore((state) => ({
    authToken: state?.loginDetails?.authToken,
    setLoginDetails: state?.setLoginDetails,
  }));
  const [userRole, setUserRole] = useState('');
  const [userAccessList, setUserAccessList] = useState<UserAccessType[]>([]);

  const fetchUserRole = async (token) => {
    const rawResponse = await apiCallToServer.get(reqEndPoints.userRole, {
      header: { Authorization: `Bearer ${token}` },
    });

    if (responseTypeGuardFunc(rawResponse)) {
      const { response, status } = rawResponse;
      if (status === 401) {
        setLoginDetails(defaultLoginDetails);
      }

      if (status === 200 && !response?.error) {
        setUserRole(response?.r);
      }
    }
  };

  const fetchUserAccessList = async (token) => {
    const rawResponse = await apiCallToServer.post(
      reqEndPoints.userAccessList,
      {
        header: { Authorization: `Bearer ${token}` },
        relation: 'userTabAccess',
      }
    );

    if (responseTypeGuardFunc(rawResponse)) {
      const { response, status } = rawResponse;
      if (status === 401) {
        setLoginDetails(defaultLoginDetails);
      }

      if (status === 200 && !response?.error) {
        setUserAccessList(response?.a);
      }
    }
  };

  useEffect(() => {
    if (userRole === 'admin') fetchUserAccessList(authToken);
  }, [userRole, authToken]);

  useEffect(() => {
    fetchUserRole(authToken);
  }, [authToken]);

  return (
    <AccountSettingsTemplate
      userRole={userRole}
      userAccessList={userAccessList}
    />
  );
};

export default AccountSettingsPage;
