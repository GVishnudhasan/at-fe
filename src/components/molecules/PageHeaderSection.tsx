import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import DropDownBtn from '@/components/atoms/DropDownBtn';
import Img from '@/components/atoms/Img';
import Spinner from '@/components/atoms/Loader/Spinner';
import { AppConfig } from '@/config';
import useStore from '@/store';
import { preventMouseDown } from '@/utils';

const { routes } = AppConfig;

interface PageHeaderSectionprops {
  pageTitle: string;
  appliedFiltersCount: number;
  isUploadLoading?: boolean;
  isDownloadLoading?: boolean;
  isUploadStatus?: {
    isError: boolean;
    displayMsg: string;
  };
  noUpload?: boolean;
  handleFileUpload?: (file: File) => Promise<void>;
  triggerTableDownload?: (output?: string) => void;
  handleModalOpen?: () => void;
  handleUploadModalOpen?: () => void;
  handleRemoveAll: () => void;
}

const PageHeaderSection = ({
  pageTitle = '',
  isUploadLoading = false,
  isDownloadLoading = false,
  appliedFiltersCount = 0,
  handleFileUpload,
  triggerTableDownload,
  isUploadStatus,
  noUpload = false,
  handleModalOpen: onFilteClick,
  handleUploadModalOpen: onUploadFormClick,
  handleRemoveAll,
}: PageHeaderSectionprops) => {
  const showDownloadOptionsForPath = ['/projects/rescue'];
  const showDownloadOptionsForQueryStrings = ['rehabClients'];
  const router = useRouter();
  const { query, pathname } = router;
  const { loginDetails, clear } = useStore((state) => ({
    loginDetails: state.loginDetails,
    clear: state.clear,
  }));
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const InputRef = useRef<null | HTMLInputElement>(null);
  const profileOptions = [
    {
      name: 'Profile',
      clickHandler: () => {
        router.push(routes.accountSettings);
      },
      cssClasses: '',
    },
    {
      name: 'Logout',
      clickHandler: () => {
        clear();
      },
      cssClasses: 'text-red-500',
    },
  ];
  const uploadOptions = [
    {
      name: 'Sheet',
      clickHandler: () => {
        if (InputRef.current) {
          InputRef.current.click();
        }
      },
      cssClasses: 'border-b border-light-blue',
    },
    {
      name: 'Form',
      clickHandler: () => onUploadFormClick && onUploadFormClick(),
      cssClasses: 'rounded-b-lg',
    },
  ];
  const downloadOptions = [
    {
      name: 'Report',
      clickHandler: () =>
        triggerTableDownload && triggerTableDownload('report'),
      cssClasses: 'border-b border-light-blue',
    },
    {
      name: 'Data',
      clickHandler: () => triggerTableDownload && triggerTableDownload(),
      cssClasses: 'rounded-b-lg',
    },
  ];
  const [showPrompt, setShowPrompt] = useState(false);
  const [showAvatarOptions, setShowAvatarOptions] = useState(false);
  const [showUploadOptions, setShowUploadOptions] = useState(false);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

  const handleShowAvatarOptions = () => setShowAvatarOptions(true);
  const handleHideAvatarOptions = () => setShowAvatarOptions(false);

  const handleShowUploadOptions = () => setShowUploadOptions(true);
  const handleHideUploadOptions = () => setShowUploadOptions(false);

  const handleShowDownloadOptions = () => setShowDownloadOptions(true);
  const handleHideDownloadOptions = () => setShowDownloadOptions(false);

  const handleAvatarClick = () => {
    handleShowAvatarOptions();
  };

  const handleUploadClick = () => {
    handleShowUploadOptions();
  };

  const handleDownloadDropDownClick = () => {
    handleShowDownloadOptions();
  };

  const handleDownloadClick = () =>
    triggerTableDownload && triggerTableDownload();

  const handleFileOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.currentTarget.files?.[0];
    if (file && handleFileUpload) {
      handleFileUpload(file)
        .catch((err) => console.log(err))
        .finally(() => {
          handleRemoveAll();
        });
    }
    handleHideUploadOptions();
    e.currentTarget.value = '';
  };

  const handleMouseDown = () => {
    handleHideAvatarOptions();
    handleHideUploadOptions();
    handleHideDownloadOptions();
  };

  useEffect(() => {
    if (isUploadStatus?.displayMsg) {
      setShowPrompt(true);
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        setShowPrompt(false);
      }, 4000);
    }
  }, [isUploadStatus]);

  useEffect(() => {
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <>
      <input
        ref={InputRef}
        type="file"
        onChange={handleFileOnChange}
        className="hidden"
      />
      <div className="mb-14 flex w-full min-w-78 items-center justify-end">
        <div className="flex items-center justify-end">
          <div>
            <Img
              src="/assets/images/ic-notification.png"
              alt="filter icon"
              classNames="h-10 w-10"
            />
          </div>
          <div
            className="relative ml-6 cursor-pointer"
            onClick={handleAvatarClick}
            aria-hidden="true"
          >
            <Img
              src={
                loginDetails?.profilePic ||
                '/assets/images/ic-default-profile-pic.png'
              }
              alt={loginDetails?.fullName}
              classNames="h-10 w-10 bg-cyan-500 shadow-lg shadow-cyan-500/50 rounded-full"
              imgClassNames="rounded-full object-cover"
            />
            {showAvatarOptions && (
              <div
                onMouseDown={preventMouseDown}
                aria-hidden="true"
                className="absolute -left-5 top-[calc(100%+6px)] z-150 border border-light-gray bg-white shadow-lg"
              >
                {profileOptions?.map((option) => {
                  return (
                    <div
                      key={option?.name}
                      className={`cursor-pointer px-4 py-2 text-sm hover:bg-slate-100 ${option?.cssClasses}`}
                      onClick={option?.clickHandler}
                      aria-hidden="true"
                    >
                      {option?.name}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mb-10 block w-full min-w-78 items-center justify-between text-center lg:flex lg:text-left">
        <div className="text-2xl font-bold">{pageTitle}</div>
        {!noUpload && (
          <div className="flex items-center justify-center">
            {showPrompt && (
              <div
                className={`mr-4 p-2 text-sm ${
                  isUploadStatus?.isError
                    ? 'bg-red-200 text-red-600'
                    : 'bg-lime-200 text-green'
                }`}
              >
                {isUploadStatus?.displayMsg}
              </div>
            )}
            <div
              onClick={onFilteClick}
              className="flex h-9 w-29.5 cursor-pointer items-center justify-center rounded bg-light-blue text-white"
              aria-hidden="true"
            >
              <div>
                Filter {appliedFiltersCount ? `(${appliedFiltersCount})` : ''}
              </div>
              <Img
                src="/assets/images/ic-filter.png"
                alt="filter icon"
                classNames="h-3 w-4.5 ml-2"
              />
            </div>
            {showDownloadOptionsForPath.includes(pathname) ||
            (query?.tabSection &&
              showDownloadOptionsForQueryStrings.includes(
                String(query?.tabSection)
              )) ? (
              <DropDownBtn
                label="Download"
                handleBtnClick={handleDownloadDropDownClick}
                isLoad={isDownloadLoading}
                showOptions={showDownloadOptions}
                options={downloadOptions}
                width="w-36"
              />
            ) : (
              <div
                onClick={handleDownloadClick}
                className="relative ml-2 flex h-9 cursor-pointer items-center justify-center rounded bg-light-blue px-3 text-white"
                aria-hidden="true"
              >
                <div>Download</div>
                {isDownloadLoading ? (
                  <div className="ml-1">
                    <Spinner borderColor="border-white/30 border-t-white" />
                  </div>
                ) : (
                  <Img
                    src="/assets/images/ic-download.png"
                    alt="filter icon"
                    classNames="h-5 w-5 ml-1"
                  />
                )}
              </div>
            )}
            <DropDownBtn
              label="Upload"
              handleBtnClick={handleUploadClick}
              isLoad={isUploadLoading}
              showOptions={showUploadOptions}
              options={uploadOptions}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default PageHeaderSection;
