import Img from '@/components/atoms/Img';
import Spinner from '@/components/atoms/Loader/Spinner';
import { preventMouseDown } from '@/utils';

type DropDownOptionsType = {
  name: string;
  cssClasses: string;
  clickHandler: () => void;
};

interface DropDownBtnType {
  label: string;
  handleBtnClick: () => void;
  isLoad: boolean;
  showOptions: boolean;
  options: DropDownOptionsType[];
  width?: string;
}

const DropDownBtn = ({
  label = '',
  handleBtnClick = () => {},
  isLoad = false,
  showOptions = false,
  options = [],
  width = 'w-29.5',
}: DropDownBtnType) => {
  return (
    <div
      onClick={handleBtnClick}
      className={`relative ml-2 flex h-9 ${width} cursor-pointer items-center justify-between rounded border border-light-blue text-light-blue`}
      aria-hidden="true"
    >
      <div className="flex w-[80%] items-center justify-center pl-2">
        <div>{label}</div>
        {isLoad && (
          <div className="ml-1">
            <Spinner borderColor="border-blue/30 border-t-blue" />
          </div>
        )}
      </div>
      <div className="flex h-full w-5 items-center border-l border-primary bg-light-blue p-0.75">
        <Img
          src="/assets/images/ic-arrow-dropdown.png"
          alt="drop-down-icon"
          classNames="h-2 w-3"
        />
      </div>
      {showOptions && (
        <div
          onMouseDown={preventMouseDown}
          className="absolute left-0 top-[100%] z-150 w-full rounded-b-lg border border-light-blue bg-white drop-shadow-lg"
          aria-hidden="true"
        >
          {options?.map((option) => (
            <div
              key={option?.name}
              className={`flex cursor-pointer bg-white p-2 text-sm text-light-blue hover:bg-light-blue/10 ${option?.cssClasses}`}
              onClick={option?.clickHandler}
              aria-hidden="true"
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDownBtn;
