import { AppConfig } from '@/config';
import { defaultUserTabs, type UserTabsType } from '@/store';

const { routes, rehabTabsParams, shelterTabsParams } = AppConfig;

interface RouterTypes {
  asPath: string;
}

type NavLinksType = {
  id: string;
  route?: string;
  name: string;
  icon: string;
  type: string;
  iconSize: string;
  isActive: boolean;
  isOpen?: boolean;
  subLinks?: {
    id: string;
    route: string;
    name: string;
    isActive: boolean;
  }[];
}[];

const defautlRouterParams: RouterTypes = { asPath: '' };

export const navLinks = (
  allowedTabs: UserTabsType = defaultUserTabs,
  router: RouterTypes = defautlRouterParams
): NavLinksType =>
  [
    {
      id: 'dashboard',
      route: routes.dashboard || '',
      name: 'Dashboard',
      icon: '/assets/images/ic-dashboard.png',
      type: 'direct-link',
      iconSize: 'w-5 h-4.5',
      isActive: router?.asPath === routes.dashboard,
    },
  ].concat([
    ...[
      {
        id: 'fieldvisits',
        route: routes.fieldVists,
        name: 'Field Visits',
        icon: '/assets/images/ic-field-visits.png',
        type: 'direct-link',
        iconSize: 'w-4 h-5',
        isActive: router?.asPath === routes.fieldVists,
      },
      {
        id: 'projects',
        name: 'Projects',
        icon: '/assets/images/ic-projects.png',
        type: 'drop-down',
        iconSize: 'w-5.5 h-5',
        isOpen: router.asPath?.includes('projects'),
        subLinks: [
          {
            id: 'projectrescue',
            route: routes.rescue,
            name: 'Rescue',
            isActive: router?.asPath === routes.rescue,
          },
          {
            id: 'projectrehabilitationhome',
            route: routes.rehabilitationHome,
            name: 'Rehabilitation Home',
            isActive: router?.asPath === routes.rehabilitationHome,
          },
          {
            id: 'projectawarenessprogram',
            route: routes.awarenessProgram,
            name: 'Awareness Program',
            isActive: router?.asPath === routes.awarenessProgram,
          },
          {
            id: 'projectecrc',
            route: routes.ecrc,
            name: 'ECRC',
            isActive: router?.asPath === routes.ecrc,
          },
          {
            id: 'projectgobishelter',
            route: routes.shelter,
            name: 'Gobi Shelter',
            isActive: router?.asPath === routes.shelter,
          },
          {
            id: 'projectadmittedtootherhomes',
            route: routes.otherHomesAdmission,
            name: 'Admitted to Other Homes',
            isActive: router?.asPath === routes.otherHomesAdmission,
          },
          // {
          //   id: 'project5a',
          //   route: routes.project5A,
          //   name: 'Project 5A',
          //   isActive: router?.asPath === routes.project5A,
          // },
          {
            id: 'projecthumanitarianservices',
            route: routes.humanitarianServices,
            name: 'Humanitarian Services',
            isActive: router?.asPath === routes.humanitarianServices,
          },
        ],
      },
      {
        id: 'outpatientservices',
        route: routes.outPatientService,
        name: 'Out Patient Services',
        icon: '/assets/images/ic-outpatient-service.png',
        type: 'direct-link',
        iconSize: 'w-5.5 h-5',
        isActive: router?.asPath === routes.outPatientService,
      },
      {
        id: 'profiles',
        name: 'Profiles',
        icon: '/assets/images/ic-profiles.png',
        type: 'drop-down',
        iconSize: 'w-5.5 h-5',
        isOpen: router.asPath?.includes('profiles'),
        subLinks: [
          {
            id: 'profilesclients',
            route: routes.clients,
            name: 'Clients',
            isActive: router?.asPath === routes.clients,
          },
          {
            id: 'profilesvolunteers',
            route: routes.volunteers,
            name: 'Volunteers',
            isActive: router?.asPath === routes.volunteers,
          },
          {
            id: 'profilesinformers',
            route: routes.informers,
            name: 'Informers',
            isActive: router?.asPath === routes.informers,
          },
          {
            id: 'profilesstaffs',
            route: routes.staffs,
            name: 'Staffs',
            isActive: router?.asPath === routes.staffs,
          },
          {
            id: 'profilesotherhomes',
            route: routes.otherHomes,
            name: 'Other Homes',
            isActive: router?.asPath === routes.otherHomes,
          },
        ],
      },
      {
        id: 'programtimelines',
        route: routes.programTimelines,
        name: 'Program Timelines',
        icon: '/assets/images/ic-timelines.png',
        type: 'direct-link',
        iconSize: 'w-5.5 h-5',
        isActive: router?.asPath === routes.programTimelines,
      },
      {
        id: 'enquiries',
        route: routes.enquiries,
        name: 'Enquiries',
        icon: '/assets/images/ic-enquiries.png',
        type: 'direct-link',
        iconSize: 'w-5.5 h-5',
        isActive: router?.asPath === routes.enquiries,
      },
      {
        id: 'reports',
        route: routes.reports,
        name: 'Reports',
        icon: '/assets/images/ic-reports.png',
        type: 'direct-link',
        iconSize: 'w-5.5 h-5',
        isActive: router?.asPath === routes.reports,
      },
    ]
      .map((navTabs) => {
        if (navTabs.subLinks) {
          const filteredSubLinks = navTabs.subLinks.filter((subNav) =>
            subNav.id === 'projectrehabilitationhome'
              ? allowedTabs.projectrehabilitationhomeactivitytracker ||
                allowedTabs.projectrehabilitationhomeclients ||
                allowedTabs.projectrehabilitationhomefoodmenu ||
                allowedTabs.projectrehabilitationhomevisitors
              : allowedTabs[subNav.id]
          );
          if (filteredSubLinks.length)
            return { ...navTabs, subLinks: filteredSubLinks };
          return null;
        }
        if (allowedTabs[navTabs.id]) {
          return navTabs;
        }

        return null;
      })
      .filter((v) => !!v),
  ] as any);

interface TabDetailTypes {
  name: string;
  value: string;
  isActive: boolean;
}

type TabsReturnTypes = TabDetailTypes[];

export const rehabTabs = (currentActiveTab: string = ''): TabsReturnTypes =>
  [
    {
      name: 'Clients',
      value: rehabTabsParams.clients,
      isActive: false,
    },
    {
      name: 'Activity Tracker',
      value: rehabTabsParams.activityTracker,
      isActive: false,
    },
    {
      name: 'Food Menu',
      value: rehabTabsParams.foodMenu,
      isActive: false,
    },
    {
      name: 'Visitors',
      value: rehabTabsParams.visitors,
      isActive: false,
    },
  ].map((tab) => ({ ...tab, isActive: currentActiveTab === tab.value }));

export const shelterTabs = (currentActiveTab: string = ''): TabsReturnTypes =>
  [
    {
      name: 'Clients',
      value: shelterTabsParams.clients,
      isActive: false,
    },
  ].map((tab) => ({ ...tab, isActive: currentActiveTab === tab.value }));

export const awarenessTabs = (currentActiveTab: string = ''): TabsReturnTypes =>
  [
    {
      name: 'Upcoming',
      value: shelterTabsParams.clients,
      isActive: false,
    },
    {
      name: 'Completed',
      value: shelterTabsParams.clients,
      isActive: false,
    },
  ].map((tab) => ({ ...tab, isActive: currentActiveTab === tab.value }));
