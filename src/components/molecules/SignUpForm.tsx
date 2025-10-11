import Spinner from '@/components/atoms/Loader/Spinner';
import type {
  SignUpDataType,
  SignUpFormErrorMaptype,
} from '@/components/templates/LoginTemplate';

type SignUpFormType<Data> = {
  signUpData: Data;
  signUpFormErrorMap: SignUpFormErrorMaptype;
  formSubmitState: boolean;
  formSubmissionStatus: {
    showStatus: boolean;
    isError: boolean;
    displayMsg: string;
  };
  onLoading: boolean;
  validateSignUpInputs: (e: React.FormEvent<HTMLInputElement>) => void;
  handleSignUpFormSubmit: (e: React.MouseEvent<HTMLElement>) => void;
  handleSignUpFormChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

const SignUpForm = ({
  signUpData,
  signUpFormErrorMap,
  formSubmitState,
  formSubmissionStatus,
  onLoading,
  validateSignUpInputs,
  handleSignUpFormSubmit,
  handleSignUpFormChange,
}: SignUpFormType<SignUpDataType>) => {
  return (
    <div className="flex h-[80%] w-full flex-col items-center justify-center">
      <div className="w-2/3 xl:w-1/2">
        <div className="mb-4 bg-primary-text-gradient bg-clip-text text-3xl font-bold text-transparent">
          Create your account
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
          className="mt-4 w-full border border-gray p-4"
          placeholder="Full name"
          name="fullName"
          value={signUpData?.fullName}
          onChange={handleSignUpFormChange}
          onBlur={validateSignUpInputs}
        />
        {signUpFormErrorMap?.fullName?.isError && (
          <div className="ml-1 mt-2 text-xs text-red-600">
            {signUpFormErrorMap?.fullName?.displayText}
          </div>
        )}
        <input
          className="mt-4 w-full border border-gray p-4"
          placeholder="Mobile Number"
          name="phone"
          maxLength={12}
          value={signUpData?.phone}
          onInput={handleSignUpFormChange}
          onBlur={validateSignUpInputs}
        />
        {signUpFormErrorMap?.phone?.isError && (
          <div className="ml-1 mt-2 text-xs text-red-600">
            {signUpFormErrorMap?.phone?.displayText}
          </div>
        )}
        <input
          type="email"
          className="mt-4 w-full border border-gray p-4"
          placeholder="Email"
          name="email"
          value={signUpData?.email}
          onChange={handleSignUpFormChange}
          onBlur={validateSignUpInputs}
        />
        {signUpFormErrorMap?.email?.isError && (
          <div className="ml-1 mt-2 text-xs text-red-600">
            {signUpFormErrorMap?.email?.displayText}
          </div>
        )}
        <input
          type="password"
          className="mt-4 w-full border border-gray p-4"
          placeholder="Password"
          name="password"
          value={signUpData?.password}
          onChange={handleSignUpFormChange}
          onBlur={validateSignUpInputs}
        />
        {signUpFormErrorMap?.password?.isError && (
          <div className="ml-1 mt-2 text-xs text-red-600">
            {signUpFormErrorMap?.password?.displayText}
          </div>
        )}
        <input
          type="password"
          className="mt-4 w-full border border-gray p-4"
          placeholder="Confirm password"
          name="confirmPassword"
          value={signUpData?.confirmPassword}
          onChange={handleSignUpFormChange}
          onBlur={validateSignUpInputs}
        />
        {signUpFormErrorMap?.confirmPassword?.isError && (
          <div className="ml-1 mt-2 text-xs text-red-600">
            {signUpFormErrorMap?.confirmPassword?.displayText}
          </div>
        )}
        <div className="">
          <button
            onClick={handleSignUpFormSubmit}
            type="submit"
            className={`mr-12 mt-12 flex items-center ${
              formSubmitState ? 'bg-light-blue' : 'bg-dark-gray'
            } px-6 py-2 font-bold text-white`}
          >
            <div>Create account</div>
            {onLoading && (
              <div className="ml-2">
                <Spinner />
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
