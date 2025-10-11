import { useEffect, useState } from 'react';

import Img from '@/components/atoms/Img';
import ToggleSwitch from '@/components/atoms/ToggleSwitch';
import { AppConfig } from '@/config';
import { apiCallToServer } from '@/services/api';
import useStore, { defaultLoginDetails } from '@/store';
import { accessTableList } from '@/utils/accessTableList';

const { userRoles, reqEndPoints } = AppConfig;

interface ApiResponsetype {
  status: number;
  response: {
    error: boolean;
    msg: string;
  };
}

const responseTypeGuardFunc = (response: any): response is ApiResponsetype => {
  return (
    response &&
    typeof response.status === 'number' &&
    response.response &&
    typeof response.response.error === 'boolean' &&
    typeof response.response.msg === 'string'
  );
};

export type UserAccessType = {
  profile_pic: string;
  fullname: string;
  fieldvisits: string;
  access_id: string;
  projectrescue: string;
  projectgobishelter: string;
  projectadmittedtootherhomes: string;
  projectrehabilitationhomeclients: string;
  projectrehabilitationhomeactivitytracker: string;
  projectrehabilitationhomefoodmenu: string;
  projectrehabilitationhomevisitors: string;
  projectecrc: string;
  project5a: string;
  projectawarenessprogram: string;
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
  isOpen: boolean;
  isChanged: boolean;
  isSyncing: boolean;
};

type AccountSettingsTemplateType = {
  userRole: string;
  userAccessList: UserAccessType[];
};

const defaultAccountForm = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  profilePic: '/assets/images/ic-default-profile-pic.png',
};

const defaultSwitchActionState = {
  action: 'auto',
  isActivate: false,
};

const AccountSettingsTemplate = ({
  userRole = '',
  userAccessList = [],
}: AccountSettingsTemplateType) => {
  const { loginDetails, setLoginDetails, clear } = useStore((state) => ({
    loginDetails: state.loginDetails,
    setLoginDetails: state.setLoginDetails,
    clear: state.clear,
  }));
  const [accountForm, setAccountForm] = useState(defaultAccountForm);
  const [customUserListWithAccessDetails, setCustomUserListWithAccessDetails] =
    useState<UserAccessType[]>([]);
  const [showAvatarOptions, setShowAvatarOptions] = useState(false);

  const profileOptions = [
    {
      name: 'Logout',
      clickHandler: () => {
        clear();
      },
      cssClasses: 'text-red-500',
    },
  ];

  const preventMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleShowAvatarOptions = () => setShowAvatarOptions(true);
  const handleHideAvatarOptions = () => setShowAvatarOptions(false);

  const handleAvatarClick = () => {
    handleShowAvatarOptions();
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value: immutableValue } = e.currentTarget;
    let { value: mutableValue } = e.currentTarget;
    if (name === 'phone') {
      if (mutableValue) {
        if (Number.isNaN(parseInt(immutableValue, 10))) {
          mutableValue = '';
        } else {
          mutableValue = parseInt(mutableValue, 10)?.toString();
        }
      }
      setAccountForm((pd) => ({
        ...pd,
        [name]: mutableValue,
      }));
    } else {
      setAccountForm((pd) => ({ ...pd, [name]: immutableValue }));
    }
  };

  const handleUserAccessUpdate = (access_id, key, val) => {
    const index = userAccessList?.findIndex(
      (syncedAccess) => syncedAccess?.access_id === access_id
    );
    const updatedRow = customUserListWithAccessDetails?.map((accessList) =>
      accessList?.access_id === access_id
        ? {
            ...accessList,
            [key]: val,
          }
        : accessList
    );
    const isChanged =
      JSON.stringify({
        ...userAccessList[index],
        isOpen: true,
        isChanged: false,
      }) !==
      JSON.stringify({ ...updatedRow[index], isOpen: true, isChanged: false });

    (updatedRow[index] || { isChanged: false }).isChanged =
      key !== 'isOpen' ? isChanged : !!updatedRow?.[index]?.isChanged;
    setCustomUserListWithAccessDetails(updatedRow);
  };

  const handleToggleUpdateAccessPerUser = (accessId, dataKey, updatedVal) => {
    if (!updatedVal.action || updatedVal.action === 'auto') return;

    let value: string | null | undefined;
    if (updatedVal?.key === 'editor') {
      if (updatedVal?.value) {
        value = 'editor';
      } else {
        value = 'viewer';
      }
    } else if (updatedVal?.key === 'viewer') {
      if (updatedVal?.value) {
        value = 'viewer';
      } else {
        value = null;
      }
    }
    handleUserAccessUpdate(accessId, dataKey, value);
  };

  const handleSync = async (e, accessId) => {
    e.preventDefault();
    e.stopPropagation();
    if (!loginDetails?.authToken) return;
    const dataToBeSynced = JSON.parse(
      JSON.stringify(
        customUserListWithAccessDetails.find((d) => d.access_id === accessId)
      )
    );

    delete dataToBeSynced.isChanged;
    delete dataToBeSynced?.isOpen;
    delete dataToBeSynced?.isSyncing;
    delete dataToBeSynced?.access_id;
    delete dataToBeSynced?.profile_pic;
    delete dataToBeSynced?.fullname;

    setCustomUserListWithAccessDetails((pd) => {
      return pd.map((d) =>
        d.access_id === accessId ? { ...d, isSyncing: true } : d
      );
    });

    const rawResponse = await apiCallToServer.post(
      reqEndPoints.editUserAccess,
      {
        header: { Authorization: `Bearer ${loginDetails?.authToken}` },
        relation: 'userTabAccess',
        updatedData: dataToBeSynced,
        accessId,
      }
    );

    if (responseTypeGuardFunc(rawResponse)) {
      const { response, status } = rawResponse;
      if (status === 401) {
        setLoginDetails(defaultLoginDetails);
      }

      if (status === 200 && !response?.error) {
        setCustomUserListWithAccessDetails((pd) => {
          return pd.map((d) =>
            d.access_id === accessId
              ? { ...d, isSyncing: false, isChanged: false }
              : d
          );
        });
      }
    }
  };

  useEffect(() => {
    setAccountForm((pd) => ({
      ...pd,
      fullName: loginDetails?.fullName || '',
      email: loginDetails?.email || '',
      phone: loginDetails?.phone || '',
      profilePic: loginDetails?.profilePic || pd.profilePic,
    }));
  }, [loginDetails]);

  useEffect(() => {
    const updatedAccessList = userAccessList?.map((list) => ({
      ...list,
      isOpen: false,
      isChanged: false,
    }));
    setCustomUserListWithAccessDetails(updatedAccessList);
  }, [userAccessList]);

  useEffect(() => {
    document.addEventListener('mousedown', handleHideAvatarOptions);
    return () => {
      document.removeEventListener('mousedown', handleHideAvatarOptions);
    };
  }, []);

  return (
    <div className="h-full">
      <div className="flex w-full items-center justify-end p-10">
        <div className="relative flex items-center">
          <div className="mr-4">{accountForm?.fullName || 'User'}</div>
          <Img
            src={accountForm?.profilePic}
            alt={accountForm?.fullName}
            classNames="h-10 w-10 bg-cyan-500 shadow-lg shadow-cyan-500/50 rounded-full cursor-pointer"
            imgClassNames="rounded-full object-cover"
            onClickHandler={handleAvatarClick}
          />
          {showAvatarOptions && (
            <div
              onMouseDown={preventMouseDown}
              aria-hidden="true"
              className="absolute -right-5 top-[calc(100%+6px)] border border-light-gray bg-white shadow-lg"
            >
              {profileOptions?.map((option) => {
                return (
                  <div
                    key={option?.name}
                    className={`cursor-pointer px-4 py-2 text-sm hover:bg-slate-100 ${option?.cssClasses}`}
                    onClick={option?.clickHandler}
                    aria-hidden="true"
                  >
                    {option?.name}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="ml-10 text-2xl font-bold">My Profile</div>
      <div className="ml-10 h-[80%] overflow-auto">
        <div className="mr-15 mt-10">
          <div className="mb-10 ml-15 text-2xl font-bold text-blue ">
            <span>Edit your Details</span>
          </div>
          <div className="border border-light-gray p-15">
            <div className="flex items-center justify-between">
              <div className="w-1/2">
                <div className="relative mt-4 h-full w-full">
                  <input
                    placeholder="Email"
                    id="useremail"
                    type="email"
                    name="email"
                    className="mt-4 w-full border border-gray p-4"
                    value={accountForm?.email}
                    onChange={handleChange}
                  />
                  <div className="absolute left-5 top-2 bg-white px-2 text-sm text-slate-500">
                    Email
                  </div>
                </div>
                <div className="relative mt-4 h-full w-full">
                  <input
                    placeholder="Full Name"
                    className="mt-4 w-full border border-gray p-4"
                    name="fullName"
                    value={accountForm?.fullName}
                    onChange={handleChange}
                  />
                  <div className="absolute left-5 top-2 bg-white px-2 text-sm text-slate-500">
                    Full Name
                  </div>
                </div>
                <div className="relative mt-4 h-full w-full">
                  <input
                    placeholder="Mobile Number"
                    className="mt-4 w-full border border-gray p-4"
                    name="phone"
                    value={accountForm?.phone}
                    onChange={handleChange}
                  />
                  <div className="absolute left-5 top-2 bg-white px-2 text-sm text-slate-500">
                    Mobile Number
                  </div>
                </div>
              </div>
              <div className="ml-4 flex w-1/2 items-center justify-center">
                <Img
                  src={accountForm?.profilePic}
                  alt={accountForm?.fullName}
                  classNames="w-40 h-40 xl:h-53 xl:w-53 bg-cyan-500 shadow-lg shadow-cyan-500/50 rounded-full"
                  imgClassNames="rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mr-15 mt-10">
          <div className="mb-10 ml-15 text-2xl font-bold text-blue ">
            Change Password
          </div>
          <div className="flex items-center justify-between border border-light-gray p-10">
            <div className="flex w-full items-center justify-between">
              <div className="relative h-full w-full">
                <input
                  placeholder="Password"
                  type="password"
                  className="mt-4 w-full border border-gray p-4"
                  name="password"
                  value={accountForm?.password}
                  onChange={handleChange}
                />
                <div className="absolute left-5 top-2 bg-white px-2 text-sm text-slate-500">
                  Password
                </div>
              </div>
              <div className="relative ml-4 h-full w-full">
                <input
                  placeholder="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  className="mt-4 w-full border border-gray p-4"
                  value={accountForm?.confirmPassword}
                  onChange={handleChange}
                />
                <div className="absolute left-5 top-2 bg-white px-2 text-sm text-slate-500">
                  Confirm Password
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-6 flex w-full items-center justify-center">
          <button
            type="button"
            className="bg-blue px-4 py-2 font-bold text-white"
          >
            Save Changes
          </button>
        </div>
        {userRole === userRoles?.admin && (
          <div className="mt-10 xl:mr-15">
            <div className="mb-10 ml-15 text-2xl font-bold text-blue ">
              User Settings
            </div>
            <div className="flex items-center justify-between p-10">
              <div className="w-full border border-light-gray p-4">
                <div className="p-4 px-10">
                  {customUserListWithAccessDetails.length ? (
                    customUserListWithAccessDetails.map((userAccess) => {
                      const handleClick = () =>
                        handleUserAccessUpdate(
                          userAccess?.access_id,
                          'isOpen',
                          !userAccess?.isOpen
                        );
                      const handleSyncClick = (e) =>
                        handleSync(e, userAccess?.access_id);
                      return (
                        <div
                          key={userAccess?.access_id || Math.random()}
                          className="relative w-full"
                        >
                          <div
                            onClick={handleClick}
                            className={`flex w-full cursor-pointer items-center justify-between border-b border-light-gray bg-white p-4 hover:bg-slate-200 ${
                              userAccess?.isOpen ? 'bg-slate-200' : 'bg-white'
                            }`}
                            aria-hidden="true"
                          >
                            <div className="flex w-50 items-center">
                              <div className="flex h-12 w-12 min-w-12 items-center justify-center rounded-full bg-dark-blue">
                                <Img
                                  src={
                                    userAccess?.profile_pic ||
                                    '/assets/images/ic-default-profile-pic.png'
                                  }
                                  alt="user"
                                  classNames="min-w-9 h-9 w-9 rounded-full"
                                  imgClassNames="object-cover rounded-full outline outline-[5px] outline-white"
                                />
                              </div>
                              <div className="text-wrap ml-2 text-sm text-slate-500 line-clamp-2">
                                {userAccess?.fullname}
                              </div>
                            </div>

                            {userAccess?.isChanged ? (
                              <button
                                type="button"
                                onClick={handleSyncClick}
                                className="border border-blue px-2 py-1 text-sm font-bold text-blue"
                              >
                                {userAccess?.isSyncing ? 'Syncing...' : 'Sync'}
                              </button>
                            ) : null}
                            <button
                              type="button"
                              className="px-2 py-1 text-2xl font-bold text-blue"
                            >
                              {userAccess?.isOpen ? '-' : '+'}
                            </button>
                          </div>
                          <div
                            className={`w-full overflow-hidden ${
                              userAccess?.isOpen ? 'p-6' : 'h-0'
                            }`}
                          >
                            <table
                              className={`w-full bg-slate-50 transition-all  ${
                                userAccess?.isOpen ? 'my-4' : 'my-[-100%]'
                              }`}
                            >
                              <thead>
                                <tr className="flex items-center justify-between px-4 py-2">
                                  <th className="ml-15 flex w-1/3 items-center justify-start">
                                    Users
                                  </th>
                                  <th className="w-1/3">Viewer</th>
                                  <th className="w-1/3">Editor</th>
                                </tr>
                              </thead>
                              <tbody>
                                {accessTableList?.map(
                                  ({ dataKey, dataName }) => {
                                    const handleToggleSwitch = (updatedVal) =>
                                      handleToggleUpdateAccessPerUser(
                                        userAccess?.access_id,
                                        dataKey,
                                        updatedVal
                                      );
                                    const viewerSwitchVal = {
                                      ...defaultSwitchActionState,
                                      isActivate: !!(
                                        userAccess[dataKey] &&
                                        userAccess[dataKey] !== 'null'
                                      ),
                                    };
                                    const editorSwitchVal = {
                                      ...defaultSwitchActionState,
                                      isActivate: !!(
                                        userAccess[dataKey] &&
                                        userAccess[dataKey] !== 'null' &&
                                        userAccess[dataKey] !== 'viewer'
                                      ),
                                    };
                                    return (
                                      <tr
                                        key={dataKey}
                                        className="flex items-center justify-between px-4 py-2 transition-all"
                                      >
                                        <td className="ml-15 flex w-1/3 items-center justify-start">
                                          {dataName}
                                        </td>
                                        <td className="flex w-1/3 items-center justify-center">
                                          <ToggleSwitch
                                            name="viewer"
                                            getInputVal={handleToggleSwitch}
                                            defaultValue={viewerSwitchVal}
                                          />
                                        </td>
                                        <td className="flex w-1/3 items-center justify-center">
                                          <ToggleSwitch
                                            name="editor"
                                            getInputVal={handleToggleSwitch}
                                            defaultValue={editorSwitchVal}
                                          />
                                        </td>
                                      </tr>
                                    );
                                  }
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center text-sm text-slate-400">
                      No Users Registered
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSettingsTemplate;
