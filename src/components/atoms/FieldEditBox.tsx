import { useEffect, useState } from 'react';

type FieldEditBoxPropsType = {
  value: string | string[];
  handleUpdate: (val: string | string[]) => void;
  header?: boolean;
};

const FieldEditBox = ({
  value,
  handleUpdate,
  header = false,
}: FieldEditBoxPropsType) => {
  const CustomInputTag = header ? 'input' : 'textarea';
  const [isEdit, setIsEdit] = useState(false);
  const [val, setval] = useState<string | string[]>('');
  const [isShowMore, setIsShowMore] = useState(false);

  const handleClick = () => setIsEdit(true);

  const handleChange = (e) => {
    const { value: inputVal } = e.currentTarget;
    setval(inputVal);
  };

  const handleSave = () => {
    if (val !== value) {
      handleUpdate(val);
    }
    setIsEdit(false);
  };

  const handleDiscard = () => {
    setval(value);
    setIsEdit(false);
  };

  const handleShowMore = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsShowMore((v) => !v);
  };

  useEffect(() => {
    setval(value);
  }, [value]);

  if (isEdit) {
    return (
      <div>
        <CustomInputTag
          value={val}
          onChange={handleChange}
          className={`p-2 ${
            header ? 'rounded-md border border-light-blue' : 'h-9'
          }`}
        />
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
      className={`cursor-pointer ${!header && 'whitespace-break-spaces'}`}
      onClick={handleClick}
      aria-hidden="true"
    >
      <span>
        {isShowMore || val.length < 24 ? val : `${val.slice(0, 25)}...`}
      </span>
      <br />
      {val.length > 24 && (
        <span
          className="text-xxs font-thick text-primary-blue"
          onClick={handleShowMore}
          aria-hidden="true"
        >
          {isShowMore ? 'show less' : 'show more'}
        </span>
      )}
    </div>
  );
};

export default FieldEditBox;
