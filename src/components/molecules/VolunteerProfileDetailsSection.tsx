import Img from '@/components/atoms/Img';
import TableBodyDataSection from '@/components/molecules/TableBodyDataSection';
import type { RowWiseData } from '@/components/organisms/ModalWrapper';
import useInfinteScroll from '@/hooks/useInfiniteScroll';

interface VolunteerProfileDetailsSectionDataType {
  [key: string]: string;
  approval_status: string;
}

type VolunteerProfileDetailsSectionPropsType = {
  volunteersData: RowWiseData[];
  handleRowEdit: (
    modifiedRowData: RowWiseData,
    key: string,
    value: any
  ) => void;
  modifiedData: RowWiseData[];
  shouldEmptyArray: boolean;
  handleTableSync: () => void;
  handlePageIncrement: () => void;
  handleResetRemoveAll: () => void;
};

const VolunteerProfileDetailsSection = ({
  volunteersData: volunteerWiseData = [],
  modifiedData,
  shouldEmptyArray,
  handleRowEdit,
  handleTableSync,
  handlePageIncrement,
  handleResetRemoveAll,
}: VolunteerProfileDetailsSectionPropsType) => {
  const { tableRow: volunteersData, setRef } = useInfinteScroll({
    tableRowWiseData: volunteerWiseData,
    shouldEmptyArray,
    handlePageIncrement,
    handleResetRemoveAll,
  });
  const getHandle = (str: string = '') => {
    const linkWithOutQuery = str?.split('?')?.[0];
    const removeLastSlash =
      linkWithOutQuery?.[linkWithOutQuery.length - 1] === '/'
        ? linkWithOutQuery?.slice(0, linkWithOutQuery.length - 1)
        : linkWithOutQuery;
    const splittedData = removeLastSlash?.split('/');
    return splittedData?.length
      ? `@${splittedData[(splittedData?.length || 1) - 1]}`
      : '';
  };
  return (
    <div className="relative h-full max-h-[60%] overflow-hidden md:max-h-[80%]">
      {modifiedData?.length ? (
        <div className="mb-4">
          {modifiedData?.length} data {modifiedData?.length >= 2 ? 'are' : 'is'}{' '}
          <span className="font-bold text-blue">modified</span>, please{' '}
          <button
            type="button"
            className="bg-blue px-2 py-px font-bold text-white"
            onClick={handleTableSync}
          >
            click
          </button>{' '}
          to sync
        </div>
      ) : null}
      <div
        ref={setRef}
        className="relative flex h-[90%] w-full flex-wrap overflow-hidden overflow-y-auto"
      >
        {volunteersData?.map((volunteerDetail) => (
          <div
            key={volunteerDetail?.id || Math.random()}
            className="w-full p-2 lg:w-1/2 xl:w-1/3"
          >
            <div className="overflow-auto rounded-xl border px-5 py-4.5 text-dark-gray">
              <div className="flex justify-between">
                <div className="mb-5 flex items-center justify-start">
                  <div className="rounded-full bg-profile-gradient">
                    <Img
                      src={
                        volunteerDetail?.volunteer_pic ||
                        '/assets/images/ic-default-profile-pic.png'
                      }
                      alt={volunteerDetail?.volunteer_name}
                      classNames="h-20 w-20 border border-transparent rounded-full p-1.5"
                      imgClassNames="rounded-full border-6 border-white"
                    />
                  </div>
                  <div className="ml-3.5">
                    <div className="text-lg font-bold">
                      {volunteerDetail?.volunteer_name}
                    </div>
                    {/* <div className="mt-px text-xs font-thick">
                      {volunteerDetail?.volunteer_id}
                    </div> */}
                  </div>
                </div>
                <div className="min-w-[50px] text-center text-xxs lg:min-w-[130px]">
                  <TableBodyDataSection
                    bodyDataType=""
                    bodyDataValue={volunteerDetail?.approval_status}
                    extraPayload={{
                      rowData: volunteerDetail,
                      key: 'approval_status',
                    }}
                    handleRowEdit={handleRowEdit || (() => {})}
                  />
                </div>
              </div>
              <div className="mb-5 flex items-start justify-start text-xs">
                <div className="mr-2 whitespace-nowrap font-thick">
                  <div className="mb-1">Gender</div>
                  <div className="mb-1">Age</div>
                  <div className="mb-1">Email</div>
                  {volunteerDetail?.education_qualification && (
                    <div className="mb-1">Qualification</div>
                  )}
                  {volunteerDetail?.blood_group && (
                    <div className="mb-1">Blood Group</div>
                  )}
                  <div className="mb-1">Father&apos;s Name</div>
                  {/* <div className="mb-1">Qualification</div>
                  <div className="mb-1">Blood Group</div> */}
                  <div className="mb-1">Address</div>
                </div>
                <div className="whitespace-nowrap">
                  <div className="mb-1">: {volunteerDetail?.gender}</div>
                  <div className="mb-1">: {volunteerDetail?.age}</div>
                  <div className="mb-1">: {volunteerDetail?.email}</div>
                  {volunteerDetail?.education_qualification && (
                    <div className="mb-1">
                      : {volunteerDetail?.education_qualification}
                    </div>
                  )}
                  {volunteerDetail?.blood_group && (
                    <div className="mb-1">: {volunteerDetail?.blood_group}</div>
                  )}
                  <div className="mb-1">: {volunteerDetail?.father_name}</div>
                  {/* <div className="mb-1">
                    : {volunteerDetail?.education_qualification}
                  </div>
                  <div className="mb-1">: {volunteerDetail?.blood_group}</div> */}
                  <div className="mb-1 whitespace-pre-line">
                    : {volunteerDetail?.location_address}
                  </div>
                </div>
              </div>
              <div>
                <div className="mb-7 flex w-full items-center justify-between px-6 text-xxs">
                  <div className="w-1/3">
                    <a href={volunteerDetail?.fb_acc || ''} target="_blank">
                      <div className="px-2">
                        <Img
                          src="/assets/images/ic-facebook.png"
                          alt="facebook-logo"
                          classNames="h-6 w-6"
                        />
                        <div className="mt-2 overflow-hidden text-ellipsis">
                          {getHandle(volunteerDetail?.fb_acc)}
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="w-1/3">
                    <a href={volunteerDetail?.insta_acc || ''} target="_blank">
                      <div className="px-2">
                        <Img
                          src="/assets/images/ic-instagram.png"
                          alt="instagram-logo"
                          classNames="h-6 w-6"
                        />
                        <div className="mt-2 overflow-hidden text-ellipsis">
                          {getHandle(volunteerDetail?.insta_acc)}
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="w-1/3">
                    <a
                      href={volunteerDetail?.linkedin_acc || ''}
                      target="_blank"
                    >
                      <div className="px-2">
                        <Img
                          src="/assets/images/ic-linkedin.png"
                          alt="twitter-logo"
                          classNames="h-6 w-6"
                          imgClassNames="rounded-md"
                        />
                        <div className="mt-2 overflow-hidden text-ellipsis">
                          {getHandle(volunteerDetail?.linkedin_acc)}
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="mx-auto w-fit rounded-md border border-green px-3 py-0.5 text-sm text-green">
                  Contact
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VolunteerProfileDetailsSection;
