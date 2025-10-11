import { useEffect, useRef, useState } from 'react';

import { AppConfig } from '@/config';
import { apiCallToServer } from '@/services/api';
import useStore, { defaultLoginDetails } from '@/store';
import { downloadBlob } from '@/utils';
import type { LoadingType, StatusType } from '@/utils/typeUtils';

const { reqEndPoints } = AppConfig;

export interface RowWiseData {
  [name: string]: any;
}

interface ApiResponsetype {
  status: number;
  response: {
    error: boolean;
    msg: string;
    d: object[];
    r: string;
    c: object;
  };
}

const listResponseTypeGuardFunc = (
  response: any
): response is ApiResponsetype => {
  return (
    response &&
    typeof response.status === 'number' &&
    response.response &&
    typeof response.response.error === 'boolean' &&
    typeof response.response.msg === 'string'
  );
};

const defaultLoadingStatus: LoadingType = {
  tableLoading: false,
  tableSyncLoading: false,
  tableUploadLoading: false,
  tableDownloading: false,
  tableHeaderLoading: false,
};

const defaultResponseStatus: StatusType = {
  tableStatus: { isError: false, displayMsg: '' },
  tableSyncStatus: { isError: false, displayMsg: '' },
  tableUploadStatus: { isError: false, displayMsg: '' },
  tableDownloadStatus: { isError: false, displayMsg: '' },
  tableHeaderStatus: { isError: false, displayMsg: '' },
};

const fetchHeaderForTableRelation = [
  'fieldVisits',
  'projectRescue',
  'projectGobiShelter',
  'projectRehabilitationHomeClients',
  'projectRehabilitationHomeActivityTracker',
  'projectRehabilitationHomeVisitors',
  'projectECRC',
  'outPatientServices',
  'enquiries',
  'profilesInformers',
  'projectAdmittedToOtherHomes',
];

const useDataTableLogics = (defaultTableData, tableRelation = '') => {
  const { loginDetails, setLoginDetails } = useStore((state) => ({
    loginDetails: state.loginDetails,
    setLoginDetails: state.setLoginDetails,
  }));
  const [userRole, setUserRole] = useState<string>('');
  const [tableHeader, setTableHeader] = useState<string[]>([]);
  const [tableData, setTableData] = useState([defaultTableData]);
  const [tableDataCount, setTableDataCount] = useState(0);
  const [selectedData, setSelectedData] = useState<RowWiseData[]>([]);
  const [modifiedData, setModifiedData] = useState<RowWiseData[]>([]);
  const [loading, setLoading] = useState(defaultLoadingStatus);
  const [responseStatus, setResponseStatus] = useState(defaultResponseStatus);
  const [currentPage, setCurrentPage] = useState(1);
  const [appliedFilter, setAppliedFilter] = useState([]);
  const limit = 10;
  const previousPageNo = useRef(1);

  const applyFilter = (filter) => {
    setAppliedFilter(filter);
  };

  const handleTableHeaderEdit = async (
    index: number,
    updatedHeader: string | string[]
  ) => {
    if (!tableRelation || loading?.tableHeaderLoading) return;
    setLoading((pd) => ({ ...pd, tableHeaderLoading: true }));
    const rawResponse = await apiCallToServer.post(reqEndPoints?.editHeader, {
      relation: tableRelation,
      headerName: `${tableRelation}Headers`,
      operation: 'edit',
      data: [index, updatedHeader],
      header: { Authorization: `Bearer ${loginDetails?.authToken}` },
    });
    if (listResponseTypeGuardFunc(rawResponse)) {
      const { response, status } = rawResponse;
      if (status === 401) {
        setLoginDetails(defaultLoginDetails);
      }
      if (status === 200 && !response?.error) {
        const { d } = response;
        const doctoredData = d[0] as { headers: string[] };
        if ('headers' in doctoredData) setTableHeader(doctoredData?.headers);
        setResponseStatus((pd) => ({
          ...pd,
          tableHeaderStatus: {
            isError: false,
            displayMsg: 'Table Header Fetched Successful !!',
          },
        }));
      } else {
        setResponseStatus((pd) => ({
          ...pd,
          tableHeaderStatus: {
            isError: true,
            displayMsg: 'Table Header Fetched Failed !!',
          },
        }));
      }
    }
    setLoading((pd) => ({ ...pd, tableHeaderLoading: false }));
  };

  const handleTableHeaderFetch = async () => {
    if (
      !tableRelation ||
      !fetchHeaderForTableRelation.includes(tableRelation) ||
      loading?.tableHeaderLoading
    )
      return;

    setLoading((pd) => ({ ...pd, tableHeaderLoading: true }));
    const rawResponse = await apiCallToServer.post(reqEndPoints?.listHeader, {
      relation: tableRelation,
      headerName: `${tableRelation}Headers`,
      header: { Authorization: `Bearer ${loginDetails?.authToken}` },
    });
    if (listResponseTypeGuardFunc(rawResponse)) {
      const { response, status } = rawResponse;
      if (status === 401) {
        setLoginDetails(defaultLoginDetails);
      }
      if (status === 200 && !response?.error) {
        const { d } = response;
        const doctoredData = d[0] as { headers: string[] };
        if ('headers' in doctoredData) setTableHeader(doctoredData?.headers);
        setResponseStatus((pd) => ({
          ...pd,
          tableHeaderStatus: {
            isError: false,
            displayMsg: 'Table Header Fetched Successful !!',
          },
        }));
      } else {
        setResponseStatus((pd) => ({
          ...pd,
          tableHeaderStatus: {
            isError: true,
            displayMsg: 'Table Header Fetched Failed !!',
          },
        }));
      }
    }
    setLoading((pd) => ({ ...pd, tableHeaderLoading: false }));
  };

  const handleTableDataFetch = async (...args) => {
    if (!tableRelation || loading?.tableLoading) return;
    const [page = 1, filter = appliedFilter] = args;
    setLoading((pd) => ({ ...pd, tableLoading: true }));
    const rawResponse = await apiCallToServer.post(reqEndPoints?.listData, {
      relation: tableRelation,
      header: { Authorization: `Bearer ${loginDetails?.authToken}` },
      ...(page ? { params: { page } } : {}),
      ...(filter.length ? { filter } : {}),
    });
    if (listResponseTypeGuardFunc(rawResponse)) {
      const { response, status } = rawResponse;
      if (status === 401) {
        setLoginDetails(defaultLoginDetails);
      }
      if (status === 200 && !response?.error) {
        previousPageNo.current = page;
        const doctoredData = response?.d?.map((fetchData) => ({
          ...fetchData,
          select: false,
          modified: false,
        }));
        setTableData(doctoredData);
        setResponseStatus((pd) => ({
          ...pd,
          tableStatus: {
            isError: false,
            displayMsg: 'Table Fetched Successful !!',
          },
        }));
      } else {
        setResponseStatus((pd) => ({
          ...pd,
          tableStatus: {
            isError: true,
            displayMsg: 'Table Fetched Failed !!',
          },
        }));
      }
    }
    setLoading((pd) => ({ ...pd, tableLoading: false }));
  };

  const handleTableDataDownload = async (...args) => {
    if (!tableRelation || loading?.tableDownloading) return;
    const [filter = appliedFilter, output = ''] = args;
    setLoading((pd) => ({ ...pd, tableDownloading: true }));
    const rawResponse = await apiCallToServer.post(reqEndPoints?.downloadCsv, {
      relation: tableRelation,
      header: { Authorization: `Bearer ${loginDetails?.authToken}` },
      ...(filter.length ? { filter } : {}),
      ...(output ? { output } : {}),
    });
    if (listResponseTypeGuardFunc(rawResponse)) {
      const { response, status } = rawResponse;
      if (status === 401) {
        setLoginDetails(defaultLoginDetails);
      }
      if (status === 200 && !response?.error) {
        const csvContent = response.r;
        const csvBlob = new Blob([csvContent], { type: 'text/csv' });
        downloadBlob(csvBlob, `${tableRelation}${output ? 'Report' : ''}.csv`);
        setResponseStatus((pd) => ({
          ...pd,
          tableDownloadStatus: {
            isError: false,
            displayMsg: 'Table Download Successful !!',
          },
        }));
      } else {
        setResponseStatus((pd) => ({
          ...pd,
          tableDownloadStatus: {
            isError: true,
            displayMsg: 'Table Download Failed !!',
          },
        }));
      }
    }
    setLoading((pd) => ({ ...pd, tableDownloading: false }));
  };

  const triggerTableDownload = (...args) =>
    handleTableDataDownload(appliedFilter, ...args);

  const handleAttachmentsAndImgUpload = async (file) => {
    const returnObj = {
      error: true,
      msg: 'failed',
    };
    if (!tableRelation || loading?.tableUploadLoading) return returnObj;
    if (!file) return returnObj;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('relation', tableRelation);
    const rawResponse = await apiCallToServer.postUpload(
      reqEndPoints?.uploadAttachmentsAndImages,
      {
        header: { Authorization: `Bearer ${loginDetails?.authToken}` },
        formData,
      }
    );
    if (listResponseTypeGuardFunc(rawResponse)) {
      const { response, status } = rawResponse;

      if (status === 401) {
        setLoginDetails(defaultLoginDetails);
      }
      if (status === 200 && !response?.error) {
        // eslint-disable-next-line consistent-return
        return Promise.resolve(response);
      }
    }
    // eslint-disable-next-line consistent-return
    return Promise.resolve({
      ...returnObj,
      d: [{ fileLocation: null }],
    });
  };

  const handleFileUpload = async (file) => {
    if (!tableRelation || loading?.tableUploadLoading) return;
    if (!file) return;
    setLoading((pd) => ({ ...pd, tableUploadLoading: true }));
    const formData = new FormData();
    formData.append('file', file);
    formData.append('relation', tableRelation);
    const rawResponse = await apiCallToServer.postUpload(
      reqEndPoints?.uploadCsv,
      {
        header: { Authorization: `Bearer ${loginDetails?.authToken}` },
        formData,
      }
    );
    if (listResponseTypeGuardFunc(rawResponse)) {
      const { response, status } = rawResponse;

      if (status === 401) {
        setLoginDetails(defaultLoginDetails);
      }
      if (status === 200 && !response?.error) {
        setResponseStatus((pd) => ({
          ...pd,
          tableUploadStatus: {
            isError: false,
            displayMsg: 'File Uploaded Successful !!',
          },
        }));
        setCurrentPage(1);
        handleTableDataFetch(1, appliedFilter);
      } else {
        setResponseStatus((pd) => ({
          ...pd,
          tableUploadStatus: {
            isError: true,
            displayMsg: 'File Uploaded Failed !!',
          },
        }));
      }
    }
    setLoading((pd) => ({ ...pd, tableUploadLoading: false }));
  };

  const handleTableSync = async () => {
    if (!tableRelation || loading?.tableSyncLoading) return;

    const isAdmin = userRole === 'admin';
    setLoading((pd) => ({ ...pd, tableSyncLoading: true }));
    const rawResponse = await apiCallToServer.post(
      isAdmin ? reqEndPoints?.adminReview : reqEndPoints?.editData,
      {
        header: { Authorization: `Bearer ${loginDetails?.authToken}` },
        relation: tableRelation,
        updatedData: modifiedData,
      }
    );

    if (listResponseTypeGuardFunc(rawResponse)) {
      const { response, status } = rawResponse;
      if (status === 401) {
        setLoginDetails(defaultLoginDetails);
      }
      if (status === 200 && !response?.error) {
        setCurrentPage(1);
        handleTableDataFetch(1, appliedFilter);
        setModifiedData([]);
        setTableData((pd) => pd.map((data) => ({ ...data, modified: false })));
        setResponseStatus((pd) => ({
          ...pd,
          tableSyncStatus: {
            isError: false,
            displayMsg: 'File Synced Successful !!',
          },
        }));
      } else {
        setResponseStatus((pd) => ({
          ...pd,
          tableSyncStatus: {
            isError: true,
            displayMsg: 'File Synced Failed !!',
          },
        }));
      }
    }
    setLoading((pd) => ({ ...pd, tableSyncLoading: false }));
  };

  const handleSelectDeselectSingleData = (
    event: React.ChangeEvent,
    rowData: RowWiseData,
    setDataFunc
  ) => {
    const { checked } = event.target as HTMLInputElement;
    if (checked) {
      setDataFunc((pd) => {
        return pd.map((data) =>
          data?.id === rowData?.id ? { ...data, select: true } : data
        );
      });
      setSelectedData((pd) => {
        return [...pd, rowData];
      });
    } else {
      setDataFunc((pd) => {
        return pd.map((data) =>
          data?.id === rowData?.id ? { ...data, select: false } : data
        );
      });
      setSelectedData((pd) => {
        return pd.filter(({ id }) => id !== rowData.id);
      });
    }
  };

  const handleSelectDeselectAllData = (
    event: React.ChangeEvent,
    setDataFunc
  ) => {
    const { checked } = event.target as HTMLInputElement;
    if (checked) {
      setDataFunc((pd) => {
        const updatedData = pd.map((data) => ({ ...data, select: true }));
        setSelectedData(updatedData);
        return updatedData;
      });
    } else {
      setDataFunc((pd) => {
        const updatedData = pd.map((data) => ({ ...data, select: false }));
        setSelectedData([]);
        return updatedData;
      });
    }
  };

  const handleRowEdit = (modifiedRowData: RowWiseData, key: string, value) => {
    if (!modifiedRowData) return;

    if ('select' in modifiedData) {
      delete modifiedData?.select;
    }
    if ('modified' in modifiedData) {
      delete modifiedData.modified;
    }
    const rowId = modifiedRowData?.id;
    setModifiedData((pd) => {
      const indexInExistingData = pd.findIndex(({ id }) => id === rowId);
      let shallowCopy = pd;
      if (indexInExistingData !== -1) {
        shallowCopy[indexInExistingData] = {
          ...shallowCopy[indexInExistingData],
          [key]: value,
        };
      } else {
        shallowCopy = [...pd, modifiedRowData];
      }
      return shallowCopy;
    });
    setTableData((pd) =>
      pd.map((data) =>
        data?.id === rowId ? { ...data, modified: true } : data
      )
    );
  };

  const fetchUserRole = async (token) => {
    const rawResponse = await apiCallToServer.get(reqEndPoints.userRole, {
      header: { Authorization: `Bearer ${token}` },
    });

    if (listResponseTypeGuardFunc(rawResponse)) {
      const { response, status } = rawResponse;
      if (status === 401) {
        setLoginDetails(defaultLoginDetails);
      }

      if (status === 200 && !response?.error) {
        setUserRole(response?.r);
      }
    }
  };

  const fetchTableTotalCount = async (...args) => {
    const [token, relation, filter = appliedFilter] = args;
    const rawResponse = await apiCallToServer.post(reqEndPoints.count, {
      params: { for: relation },
      header: { Authorization: `Bearer ${token}` },
      ...(filter.length ? { filter } : {}),
    });

    if (listResponseTypeGuardFunc(rawResponse)) {
      const { response, status } = rawResponse;
      if (status === 401) {
        setLoginDetails(defaultLoginDetails);
      }

      if (status === 200 && !response?.error) {
        setTableDataCount(Number(response?.c[relation]) || 0);
      }
    }
  };

  const handlePageIncrement = () => {
    const page =
      currentPage * limit < tableDataCount ? currentPage + 1 : currentPage;
    if (previousPageNo.current !== page)
      handleTableDataFetch(page, appliedFilter);
    setCurrentPage(page);
  };

  const handlePageDecrement = () => {
    const page = currentPage - 1 < 1 ? 1 : currentPage - 1;
    if (previousPageNo.current !== page)
      handleTableDataFetch(page, appliedFilter);
    setCurrentPage(page);
  };

  useEffect(() => {
    if (tableRelation) {
      handleTableDataFetch(currentPage, appliedFilter);
      fetchTableTotalCount(
        loginDetails?.authToken,
        tableRelation,
        appliedFilter
      );
      handleTableHeaderFetch();
    }
  }, [loginDetails?.authToken, tableRelation]);

  useEffect(() => {
    // if (appliedFilter.length) {
    setCurrentPage(1);
    handleTableDataFetch(1, appliedFilter);
    fetchTableTotalCount(loginDetails?.authToken, tableRelation, appliedFilter);
    // }
  }, [appliedFilter]);

  useEffect(() => {
    fetchUserRole(loginDetails?.authToken);
  }, [loginDetails?.authToken]);

  return {
    appliedFilter,
    tableHeader,
    tableData,
    totalCount: tableDataCount,
    selectedData,
    modifiedData,
    loading,
    responseStatus,
    currentPage,
    limit,
    handleTableDataFetch,
    handleTableHeaderEdit,
    triggerTableDownload,
    handleFileUpload,
    handleAttachmentsAndImgUpload,
    handleTableSync,
    handleSelectDeselectSingleData,
    handleSelectDeselectAllData,
    handleRowEdit,
    handlePageIncrement,
    handlePageDecrement,
    applyFilter,
  };
};

export default useDataTableLogics;
