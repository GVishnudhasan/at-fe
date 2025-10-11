import FieldEditBox from '@/components/atoms/FieldEditBox';
import FieldEditDate from '@/components/atoms/FieldEditDate';
import FieldEditDropDown from '@/components/atoms/FieldEditDropDown';
import FieldEditUpload from '@/components/atoms/FieldEditUpload';
import { approvalOptions } from '@/utils';

type ExtraPayloadTypes = {
  [key: string]: object | string | undefined;
  rowData: object;
  key: string;
  name?: string;
};

interface RowWiseData {
  [name: string]: any;
}

interface TableBodyDataSectionPropType {
  bodyDataType: string;
  bodyDataValue: string | string[];
  extraPayload: ExtraPayloadTypes;
  handleRowEdit: (
    modifiedRowData: RowWiseData,
    key: string,
    value: any
  ) => void;
  handleAttachmentsAndImgUpload:
    | ((file: File) => Promise<{ error: boolean; msg: string }>)
    | undefined;
}

const TableBodyDataSection = ({
  bodyDataType = '',
  bodyDataValue = '',
  extraPayload,
  handleRowEdit,
  handleAttachmentsAndImgUpload,
}: TableBodyDataSectionPropType) => {
  const isvalNotDefined =
    !bodyDataValue || bodyDataValue === 'undefined' || bodyDataValue === 'null';

  const handleUpdate = (val) => {
    const currrentDataKey = extraPayload?.key || '';
    const rowData = extraPayload?.rowData || {};
    const rowShallowCopy = { ...rowData };
    rowShallowCopy[currrentDataKey] = val;
    handleRowEdit(rowShallowCopy, currrentDataKey, val);
  };

  if (bodyDataType === 'date') {
    return (
      <FieldEditDate
        isvalNotDefined={isvalNotDefined}
        value={bodyDataValue}
        handleUpdate={handleUpdate}
        extraPayload={extraPayload}
      />
    );
  }
  if (bodyDataType === 'image' || bodyDataType === 'doc') {
    return (
      <FieldEditUpload
        bodyDataType={bodyDataType}
        isvalNotDefined={isvalNotDefined}
        value={bodyDataValue}
        extraPayload={extraPayload}
        handleUpdate={handleUpdate}
        handleAttachmentsAndImgUpload={handleAttachmentsAndImgUpload}
      />
    );
  }
  if (bodyDataType === 'array') {
    if (isvalNotDefined) return <div>-</div>;

    if (Array.isArray(bodyDataValue))
      return (
        <div>
          {(bodyDataValue || [])?.map((val, i) =>
            i !== bodyDataValue.length - 1 ? `${val}, ` : val
          )}
        </div>
      );
  }

  // if (bodyDataType === 'doc') {
  //   if (isvalNotDefined) return <div>-</div>;

  //   if (!Array.isArray(bodyDataValue))
  //     return (
  //       <a
  //         href={bodyDataValue}
  //         className="flex items-center justify-center"
  //         download
  //       >
  //         <Img
  //           src="/assets/images/ic-file.png"
  //           alt="file icon"
  //           classNames="h-6 w-6"
  //         />
  //         <div className="ml-2">View All</div>
  //       </a>
  //     );
  // }

  if (extraPayload?.key === 'approval_status') {
    return (
      <FieldEditDropDown
        value={bodyDataValue}
        handleEdit={handleRowEdit}
        rowData={extraPayload?.rowData || {}}
        currrentDataKey={extraPayload?.key || ''}
        optionList={approvalOptions}
      />
    );
  }

  return (
    <FieldEditBox
      value={isvalNotDefined ? '-' : bodyDataValue}
      handleUpdate={handleUpdate}
    />
  );
};

export default TableBodyDataSection;
