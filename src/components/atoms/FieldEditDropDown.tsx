import { useEffect, useState } from 'react';

type FieldEditDropDownPropsType = {
  value: string | string[];
  handleEdit: (modifiedRowData: object, key: string, value: any) => void;
  rowData: object;
  currrentDataKey: string;
  optionList: {
    optVal: string;
    optName: string;
  }[];
};

const FieldEditDropDown = ({
  value,
  handleEdit,
  rowData = {},
  currrentDataKey = '',
  optionList,
}: FieldEditDropDownPropsType) => {
  const [isEdit, setIsEdit] = useState(false);
  const [val, setval] = useState<string | string[]>('');
  const handleClick = () => setIsEdit(true);
  const handleChange = (e) => {
    const { value: inputVal } = e.currentTarget;
    setval(inputVal);
  };
  const handleSave = () => {
    if (val !== value) {
      const rowShallowCopy = { ...rowData };
      rowShallowCopy[currrentDataKey] = val;
      handleEdit(rowShallowCopy, currrentDataKey, val);
    }
    setIsEdit(false);
  };
  const handleDiscard = () => {
    setval(value);
    setIsEdit(false);
  };

  useEffect(() => {
    setval(value);
  }, [value]);

  if (isEdit) {
    return (
      <div>
        <select value={val} onChange={handleChange} className="p-2">
          {optionList.map((option) => (
            <option key={option.optVal} value={option.optVal}>
              {option.optName}
            </option>
          ))}
        </select>
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="text-green no-underline"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            type="button"
            className="text-red-600 no-underline"
            onClick={handleDiscard}
          >
            Discard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cursor-pointer" onClick={handleClick} aria-hidden="true">
      {val}
    </div>
  );
};

export default FieldEditDropDown;
