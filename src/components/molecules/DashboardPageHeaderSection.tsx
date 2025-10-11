import Link from 'next/link';

import Img from '@/components/atoms/Img';
import { AppConfig } from '@/config';
import useStore from '@/store';

const { routes } = AppConfig;

interface DashboardPageHeaderSectionProps {
  pageTitle: string;
}

const DashboardPageHeaderSection = ({
  pageTitle = '',
}: DashboardPageHeaderSectionProps) => {
  const loginDetails = useStore((state) => state.loginDetails);
  return (
    <>
      <div className="mb-14 flex w-full min-w-78 items-center justify-end">
        <div className="flex items-center justify-end">
          <div>
            <Img
              src="/assets/images/ic-notification.png"
              alt="filter icon"
              classNames="h-10 w-10"
            />
          </div>
          <Link href={routes?.accountSettings}>
            <div className="ml-6">
              <Img
                src={
                  loginDetails?.profilePic ||
                  '/assets/images/ic-default-profile-pic.png'
                }
                alt={loginDetails?.fullName}
                classNames="h-10 w-10 bg-cyan-500 shadow-lg shadow-cyan-500/50 rounded-full"
                imgClassNames="rounded-full object-cover"
              />
            </div>
          </Link>
        </div>
      </div>
      <div className="mb-10 block w-full min-w-78 items-center justify-between text-center lg:flex lg:text-left">
        <div className="text-2xl font-bold">{pageTitle}</div>
        <div className="flex items-center justify-center">
          <div className="flex h-9 w-29.5 items-center justify-center rounded bg-light-blue text-white">
            <div>Filter</div>
            <Img
              src="/assets/images/ic-filter.png"
              alt="filter icon"
              classNames="h-3 w-4.5 ml-2"
            />
          </div>
          <div className="ml-2 flex h-9 w-29.5 items-center justify-center rounded border border-light-blue text-light-blue">
            <div>Upload</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPageHeaderSection;
