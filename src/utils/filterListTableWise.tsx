import {
  admittedInOtherHomesDataKeys,
  ecrcDataKeys,
  enquiriesServiceDataKeys,
  fieldVistitsDataKeys,
  outPatientServiceDataKeys,
  profileInformersDataKeys,
  projectRehabActivityTrackerDataKeys,
  projectRehabClientsDataKeys,
  projectRehabVisitorsDataKeys,
  projectRescueDataKeys,
  projectShelterClientsDataKeys,
} from './tableDataUtils';

export const columnWiseListForFilter = {
  fieldVisits: (headerFromCloud: string[]): string[][] =>
    fieldVistitsDataKeys.map(({ key }, i) => [
      headerFromCloud[i + 1] || '',
      key,
    ]),
  projectAdmittedToOtherHomes: (headerFromCloud: string[]): string[][] =>
    admittedInOtherHomesDataKeys.map(({ key }, i) => [
      headerFromCloud[i + 1] || '',
      key,
    ]),
  projectRescueDefaultData: (headerFromCloud: string[]): string[][] =>
    projectRescueDataKeys.map(({ key }, i) => [
      headerFromCloud[i + 1] || '',
      key,
    ]),
  projectGobiShelterDefaultData: (headerFromCloud: string[]): string[][] =>
    projectShelterClientsDataKeys.map(({ key }, i) => [
      headerFromCloud[i + 1] || '',
      key,
    ]),
  projectRehabilitationHomeClientsDefaultData: (
    headerFromCloud: string[]
  ): string[][] =>
    projectRehabClientsDataKeys.map(({ key }, i) => [
      headerFromCloud[i + 1] || '',
      key,
    ]),
  projectRehabilitationHomeActivityTrackerDefaultData: (
    headerFromCloud: string[]
  ): string[][] =>
    projectRehabActivityTrackerDataKeys.map(({ key }, i) => [
      headerFromCloud[i + 1] || '',
      key,
    ]),
  projectRehabilitationHomeFoodMenuDefaultData: [
    ['Week day', 'week_day'],
    ['Breakfast', 'breakfast'],
    ['Lunch', 'lunch'],
    ['Dinner', 'dinner'],
    ['Approval Status', 'approval_status'],
    ['Admin Remarks', 'admin_remarks'],
  ],
  projectRehabilitationHomeVisitorsDefaultData: (
    headerFromCloud: string[]
  ): string[][] =>
    projectRehabVisitorsDataKeys.map(({ key }, i) => [
      headerFromCloud[i + 1] || '',
      key,
    ]),
  projectECRCDefaultData: (headerFromCloud: string[]): string[][] =>
    ecrcDataKeys.map(({ key }, i) => [headerFromCloud[i + 1] || '', key]),
  projectAwarenessProgramDefaultData: [
    ['Program Id', 'program_id'],
    ['Program Date', 'program_date'],
    ['Event Name', 'event_name'],
    ['Event Description', 'event_description'],
    ['Program Location', 'program_location'],
    ['Participant Count', 'participant_count'],
    ['Approval Status', 'approval_status'],
    ['Admin Remarks', 'admin_remarks'],
  ],
  project5ADefaultData: [
    ['Program Id', 'program_id'],
    ['Program Date', 'program_date'],
    ['Event Name', 'event_name'],
    ['Event Description', 'event_description'],
    ['Program Location', 'program_location'],
    ['Participant Count', 'participant_count'],
    ['Approval Status', 'approval_status'],
    ['Admin Remarks', 'admin_remarks'],
  ],
  projectHumanitarianServicesDefaultData: [
    ['Program Id', 'program_id'],
    ['Program Date', 'program_date'],
    ['Event Name', 'event_name'],
    ['Event Description', 'event_description'],
    ['Program Location', 'program_location'],
    ['Participant Count', 'participant_count'],
    ['Approval Status', 'approval_status'],
    ['Admin Remarks', 'admin_remarks'],
  ],
  outPatientServicesDefaultData: (headerFromCloud: string[]): string[][] =>
    outPatientServiceDataKeys.map(({ key }, i) => [
      headerFromCloud[i + 1] || '',
      key,
    ]),
  profilesClientsDefaultData: [
    ["Client's Id", 'client_id'],
    ['Client’s Name', 'client_name'],
    ['Age', 'age'],
    ['Health Condition', 'health_condition'],
    ['Gender', 'gender'],
    ['Rescue Address', 'rescue_address'],
    ['Current Status', 'current_status'],
    ['Approval Status', 'approval_status'],
    ['Admin Remarks', 'admin_remarks'],
  ],
  profilesVolunteersDefaultData: [
    ['Volunteer Name', 'volunteer_name'],
    ['Age', 'age'],
    ['Gender', 'gender'],
    ['Email', 'email'],
    ['Father Name', 'father_name'],
    ['Educational Qualification', 'education_qualification'],
    ['Blood Group', 'blood_group'],
    ['Location Address', 'location_address'],
    ['FB Acc', 'fb_acc'],
    ['Insta Acc', 'insta_acc'],
    ['LinkedIn Acc', 'linkedin_acc'],
    ['Approval Status', 'approval_status'],
    ['Admin Remarks', 'admin_remarks'],
  ],
  profilesInformersDefaultData: (headerFromCloud: string[]): string[][] =>
    profileInformersDataKeys.map(({ key }, i) => [
      headerFromCloud[i + 1] || '',
      key,
    ]),
  profilesOtherHomesDefaultData: [
    ['Home Name', 'home_name'],
    ['Home Location', 'home_location'],
    ['Home Specialist', 'home_specialist'],
    ['Founder Name', 'founder_name'],
    ['Home Contact No', 'home_contact_no'],
    ['Approval Status', 'approval_status'],
    ['Admin Remarks', 'admin_remarks'],
  ],
  profilesStaffsDefaultData: [
    ['Volunteer Name', 'volunteer_name'],
    ['Age', 'age'],
    ['Gender', 'gender'],
    ['Email', 'email'],
    ['Father Name', 'father_name'],
    ['Educational Qualification', 'education_qualification'],
    ['Blood Group', 'blood_group'],
    ['Location Address', 'location_address'],
    ['FB Acc', 'fb_acc'],
    ['Insta Acc', 'insta_acc'],
    ['LinkedIn Acc', 'linkedin_acc'],
    ['Approval Status', 'approval_status'],
    ['Admin Remarks', 'admin_remarks'],
  ],
  programTimelinesDefaultData: [
    ['Program Id', 'program_id'],
    ['Program Date', 'program_date'],
    ['Event Name', 'event_name'],
    ['Event Description', 'event_description'],
    ['Program Location', 'program_location'],
    ['Participant Count', 'participant_count'],
    ['Approval Status', 'approval_status'],
    ['Admin Remarks', 'admin_remarks'],
  ],
  enquiriesDefaultData: (headerFromCloud: string[]): string[][] =>
    enquiriesServiceDataKeys.map(({ key }, i) => [
      headerFromCloud[i + 1] || '',
      key,
    ]),
};
