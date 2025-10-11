import type { Dispatch, SetStateAction } from 'react';

interface FieldVisit {
  id: string;
  ot_regno: string;
  outreach_date: string;
  client_name: string;
  age: string;
  gender: string;
  health_condition: string;
  type_of_addiction: string;
  cause_of_beginning: string;
  income_from_begging: string;
  education_qualification: string;
  location_address: string;
  client_pic: string;
  volunteer_id: string;
  name_of_volunteers: string;
  client_status: string;
  approval_status: string;
  admin_remarks: string;
  created_at: string;
}

export interface RowWiseData {
  [name: string]: any;
}

export type LoadingType = {
  tableLoading: boolean;
  tableSyncLoading: boolean;
  tableUploadLoading: boolean;
  tableDownloading: boolean;
  tableHeaderLoading: boolean;
};

export type StatusType = {
  tableStatus: { isError: boolean; displayMsg: string };
  tableSyncStatus: { isError: boolean; displayMsg: string };
  tableUploadStatus: { isError: boolean; displayMsg: string };
  tableDownloadStatus: { isError: boolean; displayMsg: string };
  tableHeaderStatus: { isError: boolean; displayMsg: string };
};

type CompPropTypes = {
  appliedFilter: string[][];
  tableHeader: string[];
  tableData: RowWiseData[];
  totalCount: number;
  selectedData: RowWiseData[];
  modifiedData: RowWiseData[];
  loading: LoadingType;
  responseStatus: StatusType;
  currentPage: number;
  limit: number;
  handleTableHeaderEdit: (
    index: number,
    updatedStr: string | string[]
  ) => Promise<void>;
  handlePageIncrement: () => void;
  handlePageDecrement: () => void;
  triggerTableDownload: () => void;
  handleFileUpload: (file: File) => Promise<void>;
  handleAttachmentsAndImgUpload?: (file: File) => Promise<{
    error: boolean;
    msg: string;
  }>;
  handleTableSync: () => void;
  handleSelectDeselectSingleData: (
    e: React.ChangeEvent,
    rowData: RowWiseData,
    cb: Dispatch<SetStateAction<RowWiseData[]>>
  ) => void;
  handleSelectDeselectAllData: (
    e: React.ChangeEvent,
    cb: Dispatch<SetStateAction<RowWiseData[]>>
  ) => void;
  handleRowEdit: (
    modifiedRowData: RowWiseData,
    key: string,
    value: any
  ) => void;
};

interface PassedPropType extends CompPropTypes {
  applyFilter: (filter: any) => void;
}

interface TemplateType extends CompPropTypes {
  handleModalOpen: () => void;
  handleUploadModalOpen: () => void;
  removeAll: boolean;
  handleRemoveAll: () => void;
  handleResetRemoveAll: () => void;
}

export type { CompPropTypes, FieldVisit, PassedPropType, TemplateType };
