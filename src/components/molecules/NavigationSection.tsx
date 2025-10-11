import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Img from '@/components/atoms/Img';
import useStore from '@/store';
import { navLinks as getNavLinks } from '@/utils/navUtils';

interface OpenSubLinksTypes {
  [index: string]: boolean;
  Profiles: boolean;
  Projects: boolean;
}

type NavigationSectionProps = {
  handleHideNavbar: () => void;
};

const NavigationSection = ({
  handleHideNavbar = () => {},
}: NavigationSectionProps) => {
  const router = useRouter();
  const allowedTabs = useStore((state) => state.loginDetails.userTabs);
  const navLinks = getNavLinks(allowedTabs, {
    asPath: router?.asPath,
  });
  const defaultOpenSubLinks: OpenSubLinksTypes = {
    Profiles: navLinks.find(({ name }) => name === 'Profiles')?.isOpen || false,
    Projects: navLinks.find(({ name }) => name === 'Projects')?.isOpen || false,
  };

  const [openSubLinks, setOpenSubLinks] = useState(defaultOpenSubLinks);

  const handleShowSubLinks = (sublinkDropDownName = '') => {
    setOpenSubLinks((pd) => ({
      ...pd,
      [sublinkDropDownName]: !pd[sublinkDropDownName],
    }));
  };

  const handleHideClick = () => {
    handleHideNavbar();
  };

  return (
    <div className="h-full overflow-y-auto px-7 pb-10 pt-3 text-base font-title text-white">
      <div className="mr-10 mt-12">
        <Link href="/">
          <Img
            src="/assets/images/logo.png"
            alt="logo"
            classNames="pt-[37.85%]"
            imgClassNames=""
          />
        </Link>
      </div>
      <div className="mb-15 ml-2 mt-12 font-standard">
        <div className="relative" aria-hidden="true">
          <div
            onClick={handleHideClick}
            aria-hidden="true"
            className="flex cursor-pointer items-center justify-start"
          >
            <Img
              src="/assets/images/ic-hamburger.png"
              alt="icon menu"
              classNames="w-4 h-6"
            />
            <div className="ml-4">Hide Menu</div>
          </div>
        </div>
      </div>
      <div className="ml-2">
        {navLinks.map((navLink) => {
          const openDropDown = openSubLinks[navLink?.name];

          const handleSubLinksDropDown = () =>
            handleShowSubLinks(navLink?.name);

          return navLink.type === 'direct-link' ? (
            <Link key={navLink.route} href={navLink?.route || '/'}>
              <div
                className={`my-2 flex items-center justify-start rounded p-2 py-4 hover:bg-hover-gradient hover:font-standard hover:text-light-blue ${
                  navLink?.isActive &&
                  'bg-hover-gradient font-standard text-light-blue'
                }`}
              >
                <Img
                  src={navLink?.icon}
                  alt="logo"
                  classNames={`${navLink?.iconSize}`}
                  imgClassNames=""
                />
                <div className="ml-4">{navLink?.name}</div>
              </div>
            </Link>
          ) : (
            <div
              key={navLink.name}
              className={`my-2 overflow-hidden transition-all ${
                openDropDown ? 'h-auto' : 'h-14'
              }`}
            >
              <div
                onClick={handleSubLinksDropDown}
                className="flex cursor-pointer items-center justify-start p-2 py-4"
                aria-hidden="true"
              >
                <Img
                  src={navLink?.icon}
                  alt="logo"
                  classNames={`${navLink?.iconSize}`}
                  imgClassNames=""
                />
                <div className="ml-4 mr-2">{navLink?.name}</div>
                <Img
                  src="/assets/images/ic-arrow-dropdown.png"
                  alt="drop-down"
                  classNames={`w-2 h-1.5 ${
                    openDropDown ? 'rotate-0' : '-rotate-90'
                  } transition-all`}
                  imgClassNames=""
                />
              </div>
              <div className="ml-13">
                {navLink?.subLinks?.map((subLink) => (
                  <Link key={subLink.route} href={subLink?.route || '/'}>
                    <div
                      className={`mb-2 rounded p-2  hover:bg-hover-gradient hover:font-standard hover:text-light-blue ${
                        subLink?.isActive &&
                        'bg-hover-gradient font-standard text-light-blue'
                      }`}
                    >
                      {subLink?.name}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationSection;
