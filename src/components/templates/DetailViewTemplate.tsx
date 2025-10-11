import ReactDOMServer from 'react-dom/server';

import { dateNormalise } from '@/utils';

const DetailViewTemplate = ({ itemData }) => {
  const keysToBeHiddeninUIView = [
    'select',
    'client_pic',
    'pic',
    'volunteer_pic',
    'sort_order',
    'modified',
    'pageTitle',
    'admin_remarks',
    'approval_status',
  ];

  return (
    <div className="h-full w-full overflow-auto">
      <div className="mx-8 my-20 text-black">
        <div className="flex items-center justify-between">
          {/* <div className="rounded-md bg-light-blue px-2 py-1 font-thick text-white">
            Print
          </div> */}
          <div />
          <div className="text-3xl font-bold">{itemData?.pageTitle || ''}</div>
          <div className="">
            <img
              src={
                itemData?.client_pic ||
                itemData?.pic ||
                itemData?.volunteer_pic ||
                '/assets/images/ic-default-profile-pic.png'
              }
              alt={
                itemData?.client_name ||
                itemData?.visitor_name ||
                itemData?.homeless_person_name ||
                itemData?.informer_name ||
                'unknown'
              }
              className="h-36 w-30 object-cover drop-shadow-xl"
            />
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 gap-y-0">
          {Object.keys(itemData).map((key) => {
            if (keysToBeHiddeninUIView.includes(key)) return null;

            const labelStr = key.split('_').join(' ');
            const labelVal =
              key === 'created_at'
                ? dateNormalise(itemData[key])
                : itemData[key];
            return (
              <div
                className="flex w-full items-center justify-start border border-light-green p-8"
                key={key}
              >
                <div className="w-1/2 whitespace-break-spaces font-thick capitalize">
                  {labelStr}
                </div>
                <div className="w-1/2">{labelVal || '-'}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const detailViewHtml = (rowData = {}) => {
  const htmlString = ReactDOMServer.renderToStaticMarkup(
    <DetailViewTemplate itemData={rowData} />
  );
  const tempContainer = document.createElement('div');
  tempContainer.innerHTML = htmlString;
  return tempContainer;
};

export default DetailViewTemplate;
