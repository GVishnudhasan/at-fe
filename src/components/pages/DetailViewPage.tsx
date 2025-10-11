import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import DetailViewTemplate from '@/components/templates/DetailViewTemplate';
import { imageUrlToBase64 } from '@/utils';

const DetailViewPage = () => {
  const router = useRouter();
  const receivedProps = router.query;
  const [rowData, setRowData] = useState({});

  useEffect(() => {
    const alterWithBase64 = async () => {
      const doctoredData = JSON.parse(JSON.stringify(receivedProps));
      if ('client_pic' in rowData) {
        doctoredData.client_pic = await imageUrlToBase64(rowData?.client_pic);
      }
      if ('pic' in rowData) {
        doctoredData.pic = await imageUrlToBase64(rowData?.pic);
      }
      if ('volunteer_pic' in rowData) {
        doctoredData.volunteer_pic = await imageUrlToBase64(
          rowData?.volunteer_pic
        );
      }
      setRowData(doctoredData);
    };
    alterWithBase64();
  }, [router.query]);
  return <DetailViewTemplate itemData={rowData} />;
};

export default DetailViewPage;
