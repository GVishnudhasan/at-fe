import { useEffect, useState } from 'react';

import { convertToSQLDate, dateNormalise } from '@/utils';

const FieldEditDate = ({
  isvalNotDefined,
  value,
  handleUpdate,
  extraPayload,
}) => {
  const [val, setval] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const handleShowInput = () => setIsEdit(true);

  const handleSave = () => {
    if (val) {
      handleUpdate(val);
      setIsEdit(false);
    }
  };
  const handleDiscard = () => {
    setIsEdit(false);
  };

  const handleDateChange = (e) => {
    const { value: inputVal } = e.target;
    const sqlFormattedDate = convertToSQLDate(inputVal);
    setval(sqlFormattedDate || '');
  };

  useEffect(() => {
    if (!isvalNotDefined) setval(value);
    setval(value);
  }, [value]);

  if (isEdit && extraPayload?.key !== 'created_at') {
    return (
      <div>
        <input type="date" onChange={handleDateChange} />
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
    <div
      aria-hidden="true"
      onClick={handleShowInput}
      className="cursor-pointer"
    >
      {!isvalNotDefined && !Array.isArray(val) ? dateNormalise(val) : '-'}
    </div>
  );
};

export default FieldEditDate;
