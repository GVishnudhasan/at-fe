import { useEffect, useState } from 'react';

import MultiSelectDropdowns from '@/components/atoms/MultiSelectDropdowns';
import Modal from '@/components/molecules/Modal';

type OptionItemType = {
  key: string;
  compareSign: string;
  withVal: string;
  isError: boolean;
};

type SelectedListType = string[][];

type OptionListType = OptionItemType[];

const FilterModal = ({
  onCloseHandler,
  optionList,
  applyFilter,
  appliedFilter,
  handleRemoveAll,
}) => {
  const [selectedOpt, setSelectedOpt] = useState<OptionListType>([]);
  const getSelectedOptions = (options: SelectedListType) => {
    setSelectedOpt(
      options?.map((opt) => {
        const isAlreadyAppliedFilter: string[] | undefined = appliedFilter.find(
          ([key]) => key === opt[1] || key === opt[0]
        );
        return {
          key: opt[1] || opt[0] || '',
          compareSign: '=',
          withVal: isAlreadyAppliedFilter
            ? isAlreadyAppliedFilter[2] || ''
            : '',
          isError: false,
        };
      })
    );
  };

  const handleSelectedOptUpdate = (e, row) => {
    const { name, value } = e.currentTarget;
    if (!name) return;
    const regex = /^$|^[0-9,-]+$/;
    const isNumericAndComma = regex.test(value);
    setSelectedOpt((pd) =>
      pd.map((option) => {
        return option?.key === row?.key
          ? {
              ...option,
              [name]:
                // eslint-disable-next-line no-nested-ternary
                name !== 'withVal'
                  ? value
                  : (option.compareSign === '<>' && isNumericAndComma) ||
                    option.compareSign !== '<>'
                  ? value
                  : option.withVal,
            }
          : option;
      })
    );
  };

  const dataValidation = (options) => {
    let isDataValid = true;
    options.forEach(({ key, compareSign, withVal }) => {
      if (!key || !compareSign || !withVal) {
        isDataValid = false;
        setSelectedOpt((pd) =>
          pd.map((opt) => (opt.key === key ? { ...opt, isError: true } : opt))
        );
      } else {
        setSelectedOpt((pd) =>
          pd.map((opt) => (opt.key === key ? { ...opt, isError: false } : opt))
        );
      }
    });
    return isDataValid;
  };

  const handleApplyFilter = () => {
    if (dataValidation(selectedOpt)) {
      const filterNormalise = selectedOpt?.map((filter) => [
        filter?.key,
        filter?.compareSign,
        filter?.withVal,
      ]);
      handleRemoveAll();
      applyFilter(filterNormalise);
    }
  };

  useEffect(() => {
    if (appliedFilter.length && !selectedOpt.length) {
      const filterDeNormalise = appliedFilter?.map(
        ([key, compareSign, withVal]) => ({
          key,
          compareSign,
          withVal,
          isError: false,
        })
      );
      setSelectedOpt(filterDeNormalise);
    }
  }, [appliedFilter]);

  return (
    <Modal
      ZIndex="z-200"
      align="center"
      preventDismissOnInnerTap
      onCloseHandler={onCloseHandler}
      modalBg="transparent"
      classNames="h-[75%] rounded-lg shadow-lg border border-light-gray flex-col"
    >
      <div className="w-full p-10 text-left text-2xl font-bold">Filter</div>
      <div className="h-[90%] w-[80%] overflow-auto p-4">
        <MultiSelectDropdowns
          optionList={optionList}
          getSelectedOptions={getSelectedOptions}
          selectedOpt={selectedOpt.map(({ key }) => key)}
        />
        <div className="mt-10">
          {selectedOpt?.map((opt) => {
            const handleChange = (e) => handleSelectedOptUpdate(e, opt);
            return (
              <div key={opt?.key} className="mt-6 flex items-center">
                <input
                  value={opt?.key}
                  className="mr-2 inline-block w-1/3 border-b text-blue focus:outline-none"
                  onChange={handleChange}
                />
                <select
                  className={`mr-2 inline-block w-1/3 border-b ${
                    opt?.isError
                      ? 'border-red-600 text-red-600'
                      : 'border-blue text-black'
                  } focus:outline-none`}
                  name="compareSign"
                  onChange={handleChange}
                  value={opt?.compareSign}
                >
                  <option value="=">EQUAL TO</option>
                  <option value=">">GREATER THAN</option>
                  <option value="<">LESSER THAN</option>
                  <option value="<>">BETWEEN</option>
                </select>
                <div className="relative w-1/3">
                  <input
                    value={opt?.withVal}
                    name="withVal"
                    className={`mr-2 inline-block border-b focus:outline-none ${
                      opt?.isError
                        ? 'border-red-600 text-red-600'
                        : 'border-blue text-black'
                    }`}
                    onChange={handleChange}
                    placeholder="Enter Match string"
                  />
                  {opt?.isError && (
                    <div className="text-xs text-red-600">Invalid value</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <button
        className="m-4 bg-blue p-2 font-bold text-white"
        type="button"
        onClick={handleApplyFilter}
      >
        Apply Filter
      </button>
    </Modal>
  );
};

export default FilterModal;
