import { useEffect, useState } from 'react';

import LoginPage from '@/components/pages/LoginPage';
import useStore from '@/store';

const LoginLayer = ({ children }) => {
  const loginDetails = useStore((state) => state.loginDetails);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => {
    setIsUserLoggedIn(!!loginDetails?.authToken);
  }, [loginDetails?.authToken]);
  return isUserLoggedIn ? children : <LoginPage />;
};

export default LoginLayer;
