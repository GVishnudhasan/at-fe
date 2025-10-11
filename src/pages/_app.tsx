import '../styles/global.css';

import type { AppProps } from 'next/app';

import Meta from '@/components/atoms/Meta';
import LoginLayer from '@/components/molecules/LoginLayer';
import MainTemplate from '@/components/templates/MainTemplate';
import { AppInfo } from '@/utils';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <LoginLayer>
      <MainTemplate
        meta={<Meta title={AppInfo.title} description={AppInfo.description} />}
      >
        <Component {...pageProps} />
      </MainTemplate>
    </LoginLayer>
  );
};

export default MyApp;
