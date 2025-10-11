import { useEffect, useState } from 'react';

const defaultToggleState = {
  action: '',
  isActivate: false,
};

const ToggleSwitch = ({
  name = '',
  defaultValue = defaultToggleState,
  getInputVal = (obj = {}) => {
    console.log(obj);
  },
}) => {
  const [toggle, setToggle] = useState(defaultToggleState);

  const handleClick = () => {
    setToggle((pd) => ({ action: 'click', isActivate: !pd.isActivate }));
  };

  useEffect(() => {
    getInputVal({ key: name, value: toggle.isActivate, action: toggle.action });
  }, [toggle]);

  useEffect(() => {
    setToggle((pd) =>
      pd.isActivate !== defaultValue.isActivate ? defaultValue : pd
    );
  }, [defaultValue]);

  return (
    <div
      className={`relative h-6 w-[40px] cursor-pointer rounded-full ${
        toggle.isActivate ? 'bg-green' : 'bg-slate-400'
      }`}
      onClick={handleClick}
      aria-hidden="true"
    >
      <div
        className={`absolute ${
          !toggle.isActivate ? 'left-1' : 'left-[20px]'
        } top-1 h-4 w-4 rounded-full bg-white transition-all duration-500`}
      />
    </div>
  );
};

export default ToggleSwitch;
