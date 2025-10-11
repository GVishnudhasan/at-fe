/* eslint-disable import/no-extraneous-dependencies */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserTabsType = {
  fieldvisits: string;
  projectrescue: string;
  projectgobishelter: string;
  projectrehabilitationhome: string;
  projectrehabilitationhomeclients: string;
  projectrehabilitationhomeactivitytracker: string;
  projectrehabilitationhomefoodmenu: string;
  projectrehabilitationhomevisitors: string;
  projectecrc: string;
  projectadmittedtootherhomes: string;
  projectawarenessprogram: string;
  project5a: string;
  projecthumanitarianservices: string;
  outpatientservices: string;
  profilesclients: string;
  profilesvolunteers: string;
  profilesinformers: string;
  profilesotherhomes: string;
  profilesstaffs: string;
  programtimelines: string;
  enquiries: string;
  reports: string;
};

export type LoginTypes = {
  authToken: string;
  email: string;
  phone: string;
  fullName: string;
  profilePic: string;
  userRole: string;
  userTabs: UserTabsType;
};

type InitialState = {
  loginDetails: LoginTypes;
  setLoginDetails: (obj: object) => void;
  clear: () => void;
};

export const defaultUserTabs = {
  fieldvisits: '',
  projectrescue: '',
  projectgobishelter: '',
  projectrehabilitationhome: '',
  projectrehabilitationhomeclients: '',
  projectrehabilitationhomeactivitytracker: '',
  projectrehabilitationhomefoodmenu: '',
  projectrehabilitationhomevisitors: '',
  projectecrc: '',
  projectawarenessprogram: '',
  projectadmittedtootherhomes: '',
  project5a: '',
  projecthumanitarianservices: '',
  outpatientservices: '',
  profilesclients: '',
  profilesvolunteers: '',
  profilesinformers: '',
  profilesotherhomes: '',
  profilesstaffs: '',
  programtimelines: '',
  enquiries: '',
  reports: '',
};

export const defaultLoginDetails: LoginTypes = {
  authToken: '',
  email: '',
  phone: '',
  fullName: '',
  profilePic: '',
  userRole: '',
  userTabs: defaultUserTabs,
};

const initialState = (set): InitialState => ({
  loginDetails: defaultLoginDetails,
  setLoginDetails: (updatedObj: object) =>
    set((state) => ({
      ...state,
      loginDetails: { ...state.loginDetails, ...updatedObj },
    })),
  clear: () => {
    return set((state) => ({
      ...state,
      loginDetails: {},
    }));
  },
});

export default create(
  persist(initialState, {
    name: 'dashboard-state',
  })
);
