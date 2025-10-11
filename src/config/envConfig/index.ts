import prodConfig from './config-prod';
import stagConfig from './config-stage';

const ACTIVE_ENV = process.env.NEXT_PUBLIC_ACTIVE_ENV;

// eslint-disable-next-line no-console
console.log('ACTIVE_ENV:', ACTIVE_ENV);

type Config = {
  baseApiUrl: string;
  baseUrlServerApi: string;
};

const config: Config = ACTIVE_ENV === 'PRODUCTION' ? prodConfig : stagConfig;

export default config;
