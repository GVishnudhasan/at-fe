import { useEffect, useState } from 'react';

import Img from '@/components/atoms/Img';

type ColumnItemType = {
  refName: string;
  refKey: string;
  isSelected: boolean;
};

type ColumnListType = ColumnItemType[];

type MultiSelectDropdownsType = {
  optionList: [string, string][];
  selectedOpt: string[];
  getSelectedOptions: (c: string[][]) => void;
};

const MultiSelectDropdowns = ({
  optionList,
  selectedOpt: defaultSelectedOpt,
  getSelectedOptions,
}: MultiSelectDropdownsType) => {
  const [selectedOptions, setSelectedOptions] = useState<string[][]>([]);
  const [allOptions, setAlloptions] = useState<ColumnListType>([]);
  const [showOptions, setShowOptions] = useState(false);

  const handleSelected = (option) => {
    const isAlreadySelected = selectedOptions.findIndex(
      (opt) => opt[0] === option[0]
    );
    if (isAlreadySelected === -1) {
      setSelectedOptions((pd) => [...pd, option]);
    }
  };

  const handleDeSelected = (option) => {
    setSelectedOptions((pd) => pd.filter((val) => val[0] !== option[0]));
  };

  const handleChange = (e) => {
    const {
      checked,
      name,
      id,
    }: { checked: boolean; name: string; id: string } = e.currentTarget;
    setAlloptions((pd) =>
      pd.map((opt) =>
        opt?.refName === id ? { ...opt, isSelected: checked } : opt
      )
    );
    if (checked) {
      handleSelected(id === name ? [name] : [id, name]);
    } else {
      handleDeSelected(id === name ? [name] : [id, name]);
    }
  };

  const handleShowOption = () => {
    setShowOptions(true);
  };

  const handleHideOption = () => {
    setShowOptions(false);
  };

  const handleOptionsListClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleHideOption);
    return () => {
      document.removeEventListener('mousedown', handleHideOption);
    };
  }, []);

  useEffect(() => {
    const mapAllSelectedOptions: string[][] = [];
    setAlloptions(
      optionList.map((opt) => {
        const isSelected =
          defaultSelectedOpt.includes(opt[1]) ||
          defaultSelectedOpt.includes(opt[0]);
        if (isSelected && !selectedOptions.length) {
          mapAllSelectedOptions.push(opt);
        }
        return {
          refKey: opt[1] || opt[0],
          refName: opt[0],
          isSelected,
        };
      })
    );
    if (!selectedOptions.length) setSelectedOptions(mapAllSelectedOptions);
  }, [defaultSelectedOpt.length, optionList]);

  useEffect(() => {
    getSelectedOptions(selectedOptions);
  }, [selectedOptions]);

  return (
    <div className="relative w-[100%] border-b p-px px-4 ">
      <div
        onClick={handleShowOption}
        className="absolute bottom-1 right-1 cursor-pointer"
        aria-hidden="true"
      >
        <Img
          src="/assets/images/ic-arrow-dropdown-blue.png"
          alt="dropdown arrow"
          classNames="h-4 w-4 cursor-pointer"
        />
      </div>
      <div className="flex flex-wrap items-center justify-start">
        {selectedOptions.length ? (
          selectedOptions.map((opt) => (
            <div
              key={Math.random()}
              className="m-1 flex items-center rounded-2xl border border-blue px-2 py-1 text-blue"
            >
              <span className="mr-2 inline-block">{opt[0]}</span>
            </div>
          ))
        ) : (
          <div
            onClick={handleShowOption}
            className="cursor-pointer text-slate-500"
            aria-hidden="true"
          >
            Select column in drop to apply filter
          </div>
        )}
      </div>
      {showOptions && (
        <div
          onMouseDown={handleOptionsListClick}
          className="absolute left-0 top-[100%] z-200 h-56 w-full overflow-auto border border-light-gray bg-white px-4 shadow-lg"
          aria-hidden="true"
        >
          {allOptions.map((option) => (
            <div key={option?.refName} className="flex items-center p-2">
              <input
                type="checkbox"
                onChange={handleChange}
                name={option?.refKey}
                className="mr-4 inline-block h-4 w-4"
                id={option?.refName}
                checked={option?.isSelected}
              />
              <label
                htmlFor={option?.refName}
                className="inline-block cursor-pointer"
              >
                {option?.refName}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdowns;
