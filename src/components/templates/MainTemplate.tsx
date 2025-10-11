import type { ReactNode } from 'react';
import { useState } from 'react';

import NavigationBar from '@/components/organisms/NavigationBar';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const MainTemplate = (props: IMainProps) => {
  const [hideSidebar, setHideSidebar] = useState(false);

  const handleShowSidebar = () => {
    setHideSidebar(false);
  };

  const handleHideNavbar = () => {
    setHideSidebar(true);
  };

  return (
    <div className="h-full w-full text-gray-700 antialiased">
      {props.meta}

      <div className="h-full w-full">
        <div className="relative flex h-full w-full overflow-hidden">
          <NavigationBar
            hideSidebar={hideSidebar}
            handleShowSidebar={handleShowSidebar}
            handleHideNavbar={handleHideNavbar}
          />
          <main
            className={`relative mx-auto ${
              hideSidebar ? 'w-[90%]' : 'w-[calc(100%-312px-3rem)]'
            }`}
          >
            {props.children}
          </main>
        </div>

        {/* <footer className="border-t border-gray-300 py-8 text-center text-sm">
        © Copyright {new Date().getFullYear()} {AppConfig.title}.
      </footer> */}
      </div>
    </div>
  );
};

export default MainTemplate;
