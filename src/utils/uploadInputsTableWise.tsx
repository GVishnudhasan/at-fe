import { columnWiseListForFilter } from './filterListTableWise';

const eliminateKeysInForm = [
  'created_at',
  'admin_remarks',
  'approval_status',
  'color_code',
];

export const uploadFormInputsWithLabelAndKey = {
  ...columnWiseListForFilter,
  fieldVisits: (headerFromCloud: string[]) =>
    columnWiseListForFilter
      .fieldVisits(headerFromCloud)
      .filter(([_, key = '']) => !eliminateKeysInForm.includes(key)),
  projectRescueDefaultData: (headerFromCloud: string[]) =>
    columnWiseListForFilter
      .projectRescueDefaultData(headerFromCloud)
      .filter(([_, key = '']) => !eliminateKeysInForm.includes(key)),
  projectRehabilitationHomeFoodMenuDefaultData: [
    ...columnWiseListForFilter.projectRehabilitationHomeFoodMenuDefaultData,
    ['Color Code', 'color_code'],
  ].filter(([_, key = '']) => !eliminateKeysInForm.includes(key)),
  profilesClientsDefaultData: [
    ...columnWiseListForFilter.profilesClientsDefaultData,
    ['Client Image', 'client_pic'],
  ].filter(([_, key = '']) => !eliminateKeysInForm.includes(key)),
  profilesVolunteersDefaultData: [
    ...columnWiseListForFilter.profilesVolunteersDefaultData,
    ['Volunteer Pic', 'volunteer_pic'],
  ].filter(([_, key = '']) => !eliminateKeysInForm.includes(key)),
  profilesStaffsDefaultData: [
    ...columnWiseListForFilter.profilesStaffsDefaultData,
    ['Volunteer Pic', 'volunteer_pic'],
  ].filter(([_, key = '']) => !eliminateKeysInForm.includes(key)),
  enquiriesDefaultData: (headerFromCloud: string[]) =>
    columnWiseListForFilter
      .enquiriesDefaultData(headerFromCloud)
      .filter(([_, key = '']) => !eliminateKeysInForm.includes(key)),

  projectAdmittedToOtherHomes: (headerFromCloud: string[]) =>
    columnWiseListForFilter
      .projectAdmittedToOtherHomes(headerFromCloud)
      .filter(([_, key = '']) => !eliminateKeysInForm.includes(key)),
  projectGobiShelterDefaultData: (headerFromCloud: string[]) =>
    columnWiseListForFilter
      .projectGobiShelterDefaultData(headerFromCloud)
      .filter(([_, key = '']) => !eliminateKeysInForm.includes(key)),
  projectRehabilitationHomeClientsDefaultData: (headerFromCloud: string[]) =>
    columnWiseListForFilter
      .projectRehabilitationHomeClientsDefaultData(headerFromCloud)
      .filter(([_, key = '']) => !eliminateKeysInForm.includes(key)),
  projectRehabilitationHomeActivityTrackerDefaultData: (
    headerFromCloud: string[]
  ) =>
    columnWiseListForFilter
      .projectRehabilitationHomeActivityTrackerDefaultData(headerFromCloud)
      .filter(([_, key = '']) => !eliminateKeysInForm.includes(key)),
  projectRehabilitationHomeVisitorsDefaultData: (headerFromCloud: string[]) =>
    columnWiseListForFilter
      .projectRehabilitationHomeVisitorsDefaultData(headerFromCloud)
      .filter(([_, key = '']) => !eliminateKeysInForm.includes(key)),
  projectECRCDefaultData: (headerFromCloud: string[]) =>
    columnWiseListForFilter
      .projectECRCDefaultData(headerFromCloud)
      .filter(([_, key = '']) => !eliminateKeysInForm.includes(key)),
  projectAwarenessProgramDefaultData:
    columnWiseListForFilter.projectAwarenessProgramDefaultData.filter(
      ([_, key = '']) => !eliminateKeysInForm.includes(key)
    ),
  project5ADefaultData: columnWiseListForFilter.project5ADefaultData.filter(
    ([_, key = '']) => !eliminateKeysInForm.includes(key)
  ),
  projectHumanitarianServicesDefaultData:
    columnWiseListForFilter.projectHumanitarianServicesDefaultData.filter(
      ([_, key = '']) => !eliminateKeysInForm.includes(key)
    ),
  outPatientServicesDefaultData: (headerFromCloud: string[]) =>
    columnWiseListForFilter
      .outPatientServicesDefaultData(headerFromCloud)
      .filter(([_, key = '']) => !eliminateKeysInForm.includes(key)),
  profilesInformersDefaultData: (headerFromCloud: string[]) =>
    columnWiseListForFilter
      .profilesInformersDefaultData(headerFromCloud)
      .filter(([_, key = '']) => !eliminateKeysInForm.includes(key)),
  profilesOtherHomesDefaultData:
    columnWiseListForFilter.profilesOtherHomesDefaultData.filter(
      ([_, key = '']) => !eliminateKeysInForm.includes(key)
    ),
  programTimelinesDefaultData:
    columnWiseListForFilter.programTimelinesDefaultData.filter(
      ([_, key = '']) => !eliminateKeysInForm.includes(key)
    ),
};
