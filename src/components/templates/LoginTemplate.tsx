import { Fragment, useEffect, useState } from 'react';

import Img from '@/components/atoms/Img';
import SignInForm from '@/components/molecules/SignInForm';
import SignUpForm from '@/components/molecules/SignUpForm';
import { AppConfig } from '@/config';
import { apiCallToServer } from '@/services/api';
import useStore from '@/store';

const { reqEndPoints } = AppConfig;

type ResponseDataType = {
  error: boolean;
  msg: string;
};
interface ApiResponse<T> {
  status: number;
  response: T;
}

interface SignInResponse extends ResponseDataType {
  token: string;
  userDetails: object;
}

type SignUpResponse = ResponseDataType;

export type SignUpFormErrorMaptype = {
  fullName: {
    isError: boolean;
    displayText: string;
  };
  email: {
    isError: boolean;
    displayText: string;
  };
  phone: {
    isError: boolean;
    displayText: string;
  };
  password: {
    isError: boolean;
    displayText: string;
  };
  confirmPassword: {
    isError: boolean;
    displayText: string;
  };
};

export type SignInFormErrorMaptype = {
  email: {
    isError: boolean;
    displayText: string;
  };
  password: {
    isError: boolean;
    displayText: string;
  };
};

export type SignUpDataType = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword?: string;
};

export type SignInDataType = {
  email: string;
  password: string;
};

const bannerRecordData = [
  {
    count: '7.5K+',
    texts: ['Beggars', 'Counselled'],
  },
  {
    count: '900+',
    texts: ['Beggars', 'Rehabilitated'],
  },
  {
    count: '4300+',
    texts: ['Awareness', 'Programs'],
  },
  {
    count: '18+',
    texts: ['Districts', 'Covered'],
  },
];

const defaultSignInData: SignInDataType = {
  email: '',
  password: '',
};

const defaultSignUpData: SignUpDataType = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

const defaultSignUpFormErrorMap: SignUpFormErrorMaptype = {
  fullName: {
    isError: false,
    displayText: 'Please enter valid name (min 3 char)',
  },
  email: {
    isError: false,
    displayText: 'Please enter valid email(xxx@xx.xx format)',
  },
  phone: {
    isError: false,
    displayText: 'Please enter valid mobile no (min 10 char)',
  },
  password: {
    isError: false,
    displayText:
      'Please enter valid password(min 6 char & match confirm password)',
  },
  confirmPassword: {
    isError: false,
    displayText: 'Please match with entered password',
  },
};

const defaultSignInFormErrorMap: SignInFormErrorMaptype = {
  email: { isError: false, displayText: 'Incorrect Email' },
  password: { isError: false, displayText: 'Incorrect Password' },
};

const defaultFormReadyState = {
  signIn: false,
  signUp: false,
};

const defaultFormSubmissionStatus = {
  signIn: { showStatus: false, isError: false, displayMsg: '' },
  signUp: { showStatus: false, isError: false, displayMsg: '' },
};

const defaultLoadingState = {
  signIn: false,
  signUp: false,
};

const LoginTemplate = () => {
  const setLoginDetails = useStore((state) => state.setLoginDetails);
  const [showSignIn, setShowSignIn] = useState(true);
  const [signInData, setSignInData] = useState(defaultSignInData);
  const [signUpData, setSignUpData] = useState(defaultSignUpData);
  const [signInFormErrorMap, setSignInFormErrorMap] = useState(
    defaultSignInFormErrorMap
  );
  const [signUpFormErrorMap, setSignUpFormErrorMap] = useState(
    defaultSignUpFormErrorMap
  );
  const [loadingState, setLoadingState] = useState(defaultLoadingState);
  const [formReadyState, setFormReadyState] = useState(defaultFormReadyState);
  const [formSubmissionStatus, setFormSubmissionStatus] = useState(
    defaultFormSubmissionStatus
  );

  const validateSignUpInputs = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    let iserror = false;
    if (!value) {
      iserror = true;
    }
    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      iserror = true;
    }
    if (name === 'phone' && value.length < 10) {
      iserror = true;
    }
    if (name === 'password' && value.length < 6) {
      iserror = true;
    }
    if (name === 'confirmPassword' && signUpData?.password !== value) {
      iserror = true;
    }

    setSignUpFormErrorMap((pd) => ({
      ...pd,
      [name]: { ...pd[name], isError: iserror },
    }));
  };

  const validateSignInInputs = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    let iserror = false;
    if (!value) {
      iserror = true;
    }
    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      iserror = true;
    }

    setSignInFormErrorMap((pd) => ({
      ...pd,
      [name]: { ...pd[name], isError: iserror },
    }));
  };

  const handleSignUpFormUIChange = () => setShowSignIn(false);
  const handleSignInFormUIChange = () => setShowSignIn(true);

  const handleSignInFormChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormSubmissionStatus(defaultFormSubmissionStatus);
    const { name, value } = e.currentTarget;
    setSignInData((pd) => ({ ...pd, [name]: value }));
  };

  const handleSignUpFormChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormSubmissionStatus(defaultFormSubmissionStatus);
    const { name, value: immutableValue } = e.currentTarget;
    let { value: mutableValue } = e.currentTarget;
    if (name === 'phone') {
      if (mutableValue) {
        if (Number.isNaN(parseInt(immutableValue, 10))) {
          mutableValue = '';
        } else {
          mutableValue = parseInt(mutableValue, 10)?.toString();
        }
      }
      setSignUpData((pd) => ({
        ...pd,
        [name]: mutableValue,
      }));
    } else {
      setSignUpData((pd) => ({ ...pd, [name]: immutableValue }));
    }
  };

  const isUnAuthorizedSignInResponse = (
    response: any
  ): response is ApiResponse<ResponseDataType> => {
    return (
      response &&
      typeof response.status === 'number' &&
      response.response &&
      typeof response.response.error === 'boolean' &&
      typeof response.response.msg === 'string'
    );
  };

  const isSignInResponse = (
    response: any
  ): response is ApiResponse<SignInResponse> => {
    return (
      response &&
      typeof response.status === 'number' &&
      response.response &&
      typeof response.response.error === 'boolean' &&
      typeof response.response.token === 'string' &&
      typeof response.response.userDetails === 'object'
    );
  };

  const handleSignInFormSubmit = async () => {
    if (!formReadyState?.signIn) return;

    setLoadingState((pd) => ({ ...pd, signIn: true }));

    const rawResponse = await apiCallToServer.post(
      reqEndPoints?.signIn,
      signInData
    );
    if (isUnAuthorizedSignInResponse(rawResponse)) {
      const response: ApiResponse<ResponseDataType> = rawResponse;
      if (response?.status === 401) {
        const responseData = response.response;
        setFormSubmissionStatus((pd) => ({
          ...pd,
          signIn: {
            showStatus: true,
            isError: responseData?.error,
            displayMsg: responseData?.msg?.toLowerCase(),
          },
        }));
      }
    }

    if (isSignInResponse(rawResponse)) {
      const response: ApiResponse<SignInResponse> = rawResponse;
      const responseData = response?.response;
      setFormSubmissionStatus((pd) => ({
        ...pd,
        signIn: {
          showStatus: true,
          isError: responseData?.error,
          displayMsg: 'User Login Successful !',
        },
      }));
      if (response?.status === 200 && !responseData?.error) {
        setSignInData(defaultSignInData);
        setSignInFormErrorMap(defaultSignInFormErrorMap);
        setLoginDetails({
          authToken: responseData?.token,
          ...responseData?.userDetails,
        });
      }
    }

    setLoadingState((pd) => ({ ...pd, signIn: false }));
  };

  const isSignUpResponse = (
    response: any
  ): response is ApiResponse<SignUpResponse> => {
    return (
      response &&
      typeof response.status === 'number' &&
      response.response &&
      typeof response.response.error === 'boolean' &&
      typeof response.response.msg === 'string'
    );
  };

  const handleSignUpFormSubmit = async () => {
    if (!formReadyState?.signUp) return;

    setLoadingState((pd) => ({ ...pd, signUp: true }));
    const signUpPayload = JSON.parse(JSON.stringify(signUpData));
    delete signUpPayload.confirmPassword;
    const rawResponse = await apiCallToServer.post(
      reqEndPoints?.signUp,
      signUpPayload
    );

    if (isSignUpResponse(rawResponse)) {
      const response: ApiResponse<SignUpResponse> = rawResponse;
      const responseData = response.response;
      setFormSubmissionStatus((pd) => ({
        ...pd,
        signUp: {
          showStatus: true,
          isError: responseData?.error,
          displayMsg: !responseData?.error
            ? 'User Registered Successful !'
            : responseData?.msg?.toLowerCase(),
        },
      }));
      if (responseData?.msg && !responseData?.error) {
        setSignUpData(defaultSignUpData);
        setSignUpFormErrorMap(defaultSignUpFormErrorMap);
      }
    }

    setLoadingState((pd) => ({ ...pd, signUp: false }));
  };

  useEffect(() => {
    setFormReadyState((pd) => ({
      ...pd,
      signUp:
        !signUpFormErrorMap?.fullName?.isError &&
        !!signUpData?.fullName &&
        !signUpFormErrorMap?.phone?.isError &&
        !!signUpData?.phone &&
        !signUpFormErrorMap?.email?.isError &&
        !!signUpData?.email &&
        !signUpFormErrorMap?.password?.isError &&
        !!signUpData?.password &&
        !signUpFormErrorMap?.confirmPassword?.isError &&
        !!signUpData?.confirmPassword,
    }));
  }, [signUpFormErrorMap]);

  useEffect(() => {
    setFormReadyState((pd) => ({
      ...pd,
      signIn:
        !signInFormErrorMap?.email?.isError &&
        !!signInData?.email &&
        !signInFormErrorMap?.password?.isError &&
        !!signInData?.password,
    }));
  }, [signInFormErrorMap]);

  return (
    <div className="flex h-full w-full">
      <div className="h-full w-1/2 bg-theme-gradient">
        <div className="flex h-full w-full items-center">
          <div className="flex h-[70%] w-full flex-col">
            <div className="ml-6 h-[320px] w-full xl:mx-auto xl:w-[75%]">
              <div className="w-[30%]">
                <Img
                  src="/assets/images/logo.png"
                  alt="logo"
                  classNames="pt-[34.91%]"
                  imgClassNames=""
                />
              </div>
              <div className="mt-10 text-white">
                <div className="text-4xl font-bold ">
                  Beggar&apos;s Rehabilitation &<br /> Skill Development Centre
                </div>
                <div className="mt-4 bg-login-text-gradient bg-clip-text text-xl text-transparent">
                  Join Us. MAke India Beggar-Free.
                </div>
              </div>
            </div>
            <div className="grow" />
            <div className="relative mx-auto flex h-[94px] w-[95%] max-w-[600px] items-center justify-start lg:ml-3 2xl:ml-16">
              <Img
                src="/assets/images/bg-graphic-login.png"
                alt="logo"
                classNames="top-0 left-0 w-full h-full"
                imgClassNames=""
                display="absolute"
              />
              <div className="relative z-20 flex w-full items-center justify-between font-bold text-white">
                {bannerRecordData?.map(({ count, texts }) => {
                  return (
                    <div
                      key={count}
                      className="flex w-1/4 items-center justify-center border-r px-2 py-4 text-[70%]"
                    >
                      <div>{count}</div>
                      <div className="ml-2">
                        {texts?.map((text) => (
                          <Fragment key={text}>
                            {text}
                            <br />
                          </Fragment>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-full w-1/2">
        {showSignIn ? (
          <SignInForm
            signInData={signInData}
            signInFormErrorMap={signInFormErrorMap}
            formSubmitState={formReadyState?.signIn}
            formSubmissionStatus={formSubmissionStatus?.signIn}
            onLoading={loadingState?.signIn}
            validateSignInInputs={validateSignInInputs}
            handleSignInFormChange={handleSignInFormChange}
            handleSignInFormSubmit={handleSignInFormSubmit}
          />
        ) : (
          <SignUpForm
            signUpData={signUpData}
            signUpFormErrorMap={signUpFormErrorMap}
            formSubmitState={formReadyState?.signUp}
            formSubmissionStatus={formSubmissionStatus?.signUp}
            onLoading={loadingState?.signUp}
            validateSignUpInputs={validateSignUpInputs}
            handleSignUpFormChange={handleSignUpFormChange}
            handleSignUpFormSubmit={handleSignUpFormSubmit}
          />
        )}
        <div className="h-[20%] w-full">
          <div className="flex items-center justify-center">
            <hr className="w-[100px] border-dotted border-dark-gray" />
            <span className="m-4 rounded-full bg-gray px-2 text-sm text-white">
              or
            </span>
            <hr className="w-[100px] border-dotted border-dark-gray" />
          </div>
          {showSignIn ? (
            <div className="mt-4 flex items-center justify-center text-dark-gray">
              Don’t have an account yet?{' '}
              <span
                className="ml-2 cursor-pointer text-light-blue"
                onClick={handleSignUpFormUIChange}
                aria-hidden="true"
              >
                Sign Up
              </span>
            </div>
          ) : (
            <div className="mt-4 flex items-center justify-center text-dark-gray">
              Already have an account?{' '}
              <span
                className="ml-2 cursor-pointer text-light-blue"
                onClick={handleSignInFormUIChange}
                aria-hidden="true"
              >
                Sign In
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginTemplate;
