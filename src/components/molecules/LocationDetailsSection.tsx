import Img from '@/components/atoms/Img';
import useInfinteScroll from '@/hooks/useInfiniteScroll';

import type { RowWiseData } from '../organisms/ModalWrapper';
import TableBodyDataSection from './TableBodyDataSection';

interface LocationDetailsSectionDataType {
  [key: string]: string;
  approval_status: string;
}

type LocationDetailsSectionPropsType = {
  locationsData: RowWiseData[];
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

const LocationDetailsSection = ({
  locationsData: locationWiseData = [],
  modifiedData,
  shouldEmptyArray,
  handleRowEdit,
  handleTableSync,
  handlePageIncrement,
  handleResetRemoveAll,
}: LocationDetailsSectionPropsType) => {
  const { tableRow: locationsData, setRef } = useInfinteScroll({
    tableRowWiseData: locationWiseData,
    shouldEmptyArray,
    handlePageIncrement,
    handleResetRemoveAll,
  });
  return (
    <div className="relative h-full max-h-[60%] md:max-h-[80%]">
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
        {locationsData?.map((locationDetail) => {
          return (
            <div
              key={locationDetail?.id || Math.random()}
              className="w-full p-2 md:w-1/2 lg:w-1/3"
            >
              <div className="rounded-xl border px-5 py-4.5 text-dark-gray">
                <div className="flex justify-between">
                  <div>
                    <div className="text-lg font-thick ">
                      {locationDetail?.event_name || locationDetail?.home_name}
                    </div>
                    {locationDetail?.program_id ||
                      (locationDetail?.home_id && (
                        <div className="text-xs font-thick text-blue">
                          {locationDetail?.program_id ||
                            locationDetail?.home_id ||
                            ''}
                        </div>
                      ))}
                  </div>
                  <div className="min-w-[50px] text-right text-xxs lg:min-w-[130px]">
                    <TableBodyDataSection
                      bodyDataType=""
                      bodyDataValue={locationDetail?.approval_status}
                      extraPayload={{
                        rowData: locationDetail,
                        key: 'approval_status',
                      }}
                      handleRowEdit={handleRowEdit || (() => {})}
                    />
                  </div>
                </div>
                <div className="mb-7 mt-3.5 text-xs">
                  {locationDetail?.event_description ||
                    locationDetail?.home_description}
                  {locationDetail?.home_specialist && (
                    <div>
                      <span className="font-thick">Home Specialist:</span>&nbsp;
                      <span>{locationDetail?.home_specialist}</span>
                    </div>
                  )}
                  {locationDetail?.founder_name && (
                    <div>
                      <span className="font-thick">Founder Name:</span>&nbsp;
                      <span>{locationDetail?.founder_name}</span>
                    </div>
                  )}
                  {locationDetail?.home_contact_no && (
                    <div>
                      <span className="font-thick">Home Contact No:</span>&nbsp;
                      <span>{locationDetail?.home_contact_no}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap items-end justify-between">
                  <div>
                    {locationDetail?.program_date && (
                      <div className="mb-2 flex items-center justify-start">
                        <Img
                          src="/assets/images/ic-calender.png"
                          alt="calender icon"
                          classNames="h-4 w-4"
                        />
                        <div className="ml-2 text-sm">
                          {locationDetail?.program_date}
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-start">
                      <Img
                        src="/assets/images/ic-marker.png"
                        alt="marker icon"
                        classNames="h-4 w-3"
                      />
                      <div className="ml-2 text-sm">
                        {locationDetail?.program_location ||
                          locationDetail?.home_location}
                      </div>
                    </div>
                  </div>
                  {locationDetail?.participant_count && (
                    <div className="mt-2 text-center">
                      <div className="mb-1 text-xl font-thick text-blue">
                        {locationDetail?.participant_count}
                      </div>
                      <div className="text-sm">Participants</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LocationDetailsSection;
