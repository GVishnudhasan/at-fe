/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';

import PageHeaderSection from '@/components/molecules/PageHeaderSection';
import { AppConfig } from '@/config';
import { apiCallToServer } from '@/services/api';
import useStore, { defaultLoginDetails } from '@/store';

const { reqEndPoints } = AppConfig;

export type DashboardDataTypes = {
  [key: string]: string;
  fieldvisits: string;
  projectRescue: string;
  projectGobiShelter: string;
  projectAdmittedToOtherHomes: string;
  projectRehabilitationHomeClients: string;
  projectECRC: string;
  project5A: string;
  projectAwarenessProgram: string;
  projectHumanitarianServices: string;
  outPatientServices: string;
};

export const defaultCounts = {
  fieldvisits: '',
  projectRescue: '',
  projectGobiShelter: '',
  projectAdmittedToOtherHomes: '',
  projectRehabilitationHomeClients: '',
  projectECRC: '',
  project5A: '',
  projectAwarenessProgram: '',
  projectHumanitarianServices: '',
  outPatientServices: '',
};

type DataKeyType = {
  header: string;
  count?: string;
  type?: string;
  description?: string[];
  icon?: string;
  dataKey: string;
};

interface ApiResponsetype {
  status: number;
  response: {
    error: boolean;
    msg: string;
    c: DashboardDataTypes;
  };
}

const responseTypeGuardFunc = (response: any): response is ApiResponsetype => {
  return (
    response &&
    typeof response.status === 'number' &&
    response.response &&
    typeof response.response.error === 'boolean' &&
    typeof response.response.msg === 'string'
  );
};

const DashboardTemplate = () => {
  const { authToken, setLoginDetails } = useStore((state) => ({
    authToken: state?.loginDetails?.authToken,
    setLoginDetails: state?.setLoginDetails,
  }));
  const [countsData, setCountsData] = useState(defaultCounts);
  const defaultOverallDataCount: DataKeyType[] = [
    {
      header: 'Rescued Clients',
      count: '00',
      icon: '/assets/images/ic-orange.png',
      dataKey: 'projectRescue',
    },
    {
      header: 'Gobi Shelter Clients',
      count: '00',
      icon: '/assets/images/ic-blue.png',
      dataKey: 'projectGobiShelter',
    },
    {
      header: 'Rehabilitation Clients',
      count: '00',
      icon: '/assets/images/ic-green.png',
      dataKey: 'projectRehabilitationHomeClients',
    },
    {
      header: 'Admitted To Other Homes',
      count: '00',
      icon: '/assets/images/ic-light-blue.png',
      dataKey: 'projectAdmittedToOtherHomes',
    },
    {
      header: 'Together, Let’s Make India Beggar-Free',
      type: 'custom',
      dataKey: 'fieldVisits',
    },
    {
      header: 'ECRC',
      count: '00',
      icon: '/assets/images/ic-orange.png',
      dataKey: 'projectECRC',
    },
    {
      header: '5A',
      count: '00',
      icon: '/assets/images/ic-blue.png',
      dataKey: 'project5A',
    },
    {
      header: 'Awareness Programs',
      count: '00',
      icon: '/assets/images/ic-green.png',
      dataKey: 'projectAwarenessProgram',
    },
    {
      header: 'Humanitarian Services',
      count: '00',
      icon: '/assets/images/ic-light-blue.png',
      dataKey: 'projectHumanitarianServices',
    },
    {
      header: 'Contact',
      description: ['+91 9943908424', '+91 9787800267'],
      type: 'custom',
      icon: '/assets/images/ic-group-dashboard.png',
      dataKey: 'inquiries',
    },
    {
      header: 'Field visits',
      count: '00',
      icon: '/assets/images/ic-orange.png',
      dataKey: 'fieldvisits',
    },
    {
      header: 'Out Patient Services',
      count: '00',
      icon: '/assets/images/ic-blue.png',
      dataKey: 'outPatientServices',
    },
  ];

  const [overallDetails, setOverallDetails] = useState(defaultOverallDataCount);

  const fetchDashboarDataCounts = async (userToken) => {
    const rawResponse = await apiCallToServer.post(reqEndPoints.count, {
      header: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    if (responseTypeGuardFunc(rawResponse)) {
      if (rawResponse.status === 401) {
        setLoginDetails(defaultLoginDetails);
      }
      const { response } = rawResponse;
      if (rawResponse.status === 200 && !response.error) {
        setCountsData(response.c);
      }
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchDashboarDataCounts(authToken);
    }
  }, [authToken]);

  useEffect(() => {
    setOverallDetails((pd) =>
      pd.map((d) => ({ ...d, count: countsData[d.dataKey] }))
    );
  }, [countsData]);
  return (
    <div className="mx-auto mt-12 h-full w-[95%]">
      <PageHeaderSection pageTitle="Dashboard" noUpload />
      <div className="mx-auto h-full max-h-[60%] md:max-h-[65%]">
        <div className="mt-24 flex h-full w-full flex-wrap justify-start overflow-y-auto">
          {overallDetails?.map((detail, i) =>
            detail?.type !== 'custom' ? (
              <div key={i} className="my-1.5 h-[234px] w-[205px] xl:w-1/5">
                <div className="mx-1.5 h-full rounded-lg border pl-6 pt-12">
                  <div className="h-12 w-12">
                    <img
                      src={detail?.icon}
                      alt={detail?.header}
                      className="h-full w-full"
                    />
                  </div>
                  <div className="mt-6 text-sm font-standard">
                    {detail?.header}
                  </div>
                  <div className="text-4xl font-standard">{detail?.count}</div>
                </div>
              </div>
            ) : (
              <div key={i} className="my-1.5 h-[234px] w-[205px] xl:w-1/5">
                <div
                  className={`mx-1.5 flex h-full flex-col items-start justify-center rounded-lg border ${
                    detail?.description
                      ? 'bg-dashboard-contact-card-gradient'
                      : 'bg-dashboard-card-gradient'
                  } px-1.5 pl-6 text-2xl font-bold text-white`}
                >
                  <div className="flex">
                    {detail?.icon && (
                      <div className="h-8 w-8">
                        <img
                          src={detail?.icon}
                          alt="ic-group-dashboard"
                          className="h-full w-full"
                        />
                      </div>
                    )}
                    <div className="ml-3">{detail?.header}</div>
                  </div>
                  {detail?.description &&
                    detail?.description?.map((para, index) => (
                      <div className="mt-8 text-sm" key={index}>
                        {para}
                      </div>
                    ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardTemplate;
