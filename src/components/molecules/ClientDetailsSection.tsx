import Img from '@/components/atoms/Img';
import TableBodyDataSection from '@/components/molecules/TableBodyDataSection';
import type { RowWiseData } from '@/components/organisms/ModalWrapper';
import useInfinteScroll from '@/hooks/useInfiniteScroll';
import { generateRandomColor } from '@/utils';

interface ClientDetailsSectionDataType {
  [key: string]: string;
  approval_status: string;
}

type ClientDetailsSectionPropsType = {
  clientsData: RowWiseData[];
  handleRowEdit: (
    modifiedRowData: RowWiseData,
    key: string,
    value: any
  ) => void;
  shouldEmptyArray: boolean;
  modifiedData: RowWiseData[];
  handleTableSync: () => void;
  handlePageIncrement: () => void;
  handleResetRemoveAll: () => void;
};

const ClientDetailsSection = ({
  clientsData: clientListWiseData = [],
  modifiedData,
  shouldEmptyArray,
  handleRowEdit,
  handleTableSync,
  handlePageIncrement,
  handleResetRemoveAll,
}: ClientDetailsSectionPropsType) => {
  const { tableRow: clientsData, setRef } = useInfinteScroll({
    tableRowWiseData: clientListWiseData,
    shouldEmptyArray,
    handlePageIncrement,
    handleResetRemoveAll,
  });
  return (
    <>
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
        className="relative flex max-h-[60%] w-full flex-wrap overflow-auto md:max-h-[70%]"
      >
        {clientsData?.map((clientsDetail) => {
          const randomColor = generateRandomColor();
          return (
            <div
              key={clientsDetail?.id || Math.random()}
              className="w-full p-2"
            >
              <div className="flex w-full items-center justify-between overflow-hidden overflow-x-auto rounded-xl border p-6 text-dark-gray">
                <div className="flex items-center justify-start">
                  <div className="rounded-full bg-profile-gradient">
                    <Img
                      src={
                        clientsDetail?.client_pic ||
                        '/assets/images/ic-default-profile-pic.png'
                      }
                      alt={clientsDetail?.client_name}
                      classNames="h-24 w-24 border-2 border-transparent rounded-full p-1.5"
                      imgClassNames="rounded-full border-6 border-white"
                    />
                  </div>
                  <div className="ml-5 whitespace-nowrap">
                    <div className="text-lg font-bold">
                      {clientsDetail?.client_name}
                    </div>
                    <div className="mt-3 text-sm font-standard">
                      {clientsDetail?.client_id}
                    </div>
                  </div>
                </div>
                <div className="ml-5 flex flex-col items-center justify-start whitespace-nowrap">
                  <div className="font-bold">Age</div>
                  <div className="mt-4">{clientsDetail?.age}</div>
                </div>
                <div className="ml-5 flex flex-col items-center justify-start whitespace-nowrap">
                  <div className="font-bold">Health Condition</div>
                  <div className="mt-4">{clientsDetail?.health_condition}</div>
                </div>
                <div className="ml-5 flex flex-col items-center justify-start whitespace-nowrap">
                  <div className="font-bold">Gender</div>
                  <div className="mt-4">{clientsDetail?.gender}</div>
                </div>
                <div className="ml-5 flex flex-col items-center justify-start whitespace-nowrap">
                  <div className="font-bold ">Rescue Address</div>
                  <div className="mt-4">{clientsDetail?.rescue_address}</div>
                </div>
                <div className="ml-5 flex flex-col items-center justify-start whitespace-nowrap">
                  <div className="font-bold">Current Status</div>
                  <div
                    className="mt-4 rounded-full px-4 py-2 text-center text-xxs font-bold text-white"
                    style={{ background: '#05AF9B' }}
                  >
                    {clientsDetail?.current_status}
                  </div>
                </div>
                <div className="ml-5 whitespace-nowrap">
                  <div className="font-bold">Approval Status</div>
                  <div className="mt-4 rounded-full border border-slate-200 px-4 py-2 text-center text-xxs font-bold text-slate-400">
                    <TableBodyDataSection
                      bodyDataType=""
                      bodyDataValue={clientsDetail?.approval_status}
                      extraPayload={{
                        rowData: clientsDetail,
                        key: 'approval_status',
                      }}
                      handleRowEdit={handleRowEdit || (() => {})}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ClientDetailsSection;
