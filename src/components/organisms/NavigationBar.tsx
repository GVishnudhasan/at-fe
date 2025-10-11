import { useEffect } from 'react';

import Img from '@/components/atoms/Img';
import NavigationSection from '@/components/molecules/NavigationSection';
import { AppConfig } from '@/config';

const { width } = AppConfig;

const NavigationBar = ({
  hideSidebar = false,
  handleHideNavbar = () => {},
  handleShowSidebar = () => {},
}) => {
  useEffect(() => {
    if (window?.innerWidth < width?.sideBarCloseBefore) {
      handleHideNavbar();
    }
  }, []);

  return (
    <nav
      className={`relative z-150 min-w-78 ${
        hideSidebar ? '-ml-77 mr-12' : 'ml-0'
      } h-full bg-navbar-gradient transition-all`}
    >
      <NavigationSection handleHideNavbar={handleHideNavbar} />
      <div
        onClick={handleShowSidebar}
        className={`absolute -right-8 top-43 cursor-pointer rounded-xl bg-primary-blue p-4 ${
          hideSidebar ? 'block' : 'hidden'
        }`}
        aria-hidden="true"
      >
        <Img
          src="/assets/images/ic-hamburger.png"
          alt="icon menu"
          classNames="w-4 h-6"
        />
      </div>
    </nav>
  );
};

export default NavigationBar;
