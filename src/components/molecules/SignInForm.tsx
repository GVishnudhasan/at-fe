import Spinner from '@/components/atoms/Loader/Spinner';
import type {
  SignInDataType,
  SignInFormErrorMaptype,
} from '@/components/templates/LoginTemplate';

type SignInFormType<Data> = {
  signInData: Data;
  signInFormErrorMap: SignInFormErrorMaptype;
  formSubmitState: boolean;
  formSubmissionStatus: {
    showStatus: boolean;
    isError: boolean;
    displayMsg: string;
  };
  onLoading: boolean;
  validateSignInInputs: (e: React.FormEvent<HTMLInputElement>) => void;
  handleSignInFormSubmit: (e: React.MouseEvent<HTMLElement>) => void;
  handleSignInFormChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

const SignInForm = ({
  signInData,
  signInFormErrorMap,
  formSubmitState,
  formSubmissionStatus,
  onLoading,
  validateSignInInputs = () => {},
  handleSignInFormSubmit = () => {},
  handleSignInFormChange = () => {},
}: SignInFormType<SignInDataType>) => {
  return (
    <div className="flex h-[80%] w-full flex-col items-center justify-center">
      <div className="w-2/3 xl:w-1/2">
        <div className="mb-8 bg-primary-text-gradient bg-clip-text text-3xl font-bold text-transparent">
          Sign In
        </div>
        {formSubmissionStatus?.showStatus && (
          <div
            className={`text-center capitalize ${
              formSubmissionStatus?.isError ? ' text-red-600' : 'text-green'
            }`}
          >
            {formSubmissionStatus?.displayMsg}
          </div>
        )}
        <input
          type="email"
          className="mt-6 w-full border border-gray p-4"
          placeholder="Email"
          name="email"
          value={signInData?.email}
          onChange={handleSignInFormChange}
          onBlur={validateSignInInputs}
        />
        {signInFormErrorMap?.email?.isError && (
          <div className="ml-1 mt-2 text-xs text-red-600">
            {signInFormErrorMap?.email?.displayText}
          </div>
        )}
        <input
          type="password"
          className="mt-4 w-full border border-gray p-4"
          placeholder="Password"
          name="password"
          value={signInData?.password}
          onChange={handleSignInFormChange}
          onBlur={validateSignInInputs}
        />
        {signInFormErrorMap?.password?.isError && (
          <div className="ml-1 mt-2 text-xs text-red-600">
            {signInFormErrorMap?.password?.displayText}
          </div>
        )}
        <div className="mt-12 flex items-center">
          <button
            onClick={handleSignInFormSubmit}
            type="submit"
            className={`mr-12 flex items-center ${
              formSubmitState
                ? 'bg-light-blue text-white'
                : 'bg-dark-gray text-gray'
            } px-6 py-2 font-bold`}
          >
            <div>Sign In</div>
            {onLoading && (
              <div className="ml-2">
                <Spinner />
              </div>
            )}
          </button>
          <button type="button" className="text-light-blue">
            Trouble signing in?
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
