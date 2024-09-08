const BASE_URL = import.meta.env.VITE_BASE_URL;


export const userEndPoints = {
  SIGNUP: `${BASE_URL}/api/v1/user/register`,
  LOGIN: `${BASE_URL}/api/v1/user/login`,
  UPDATE_PROFILE : `${BASE_URL}/api/v1/user/updateProfile`,
  LOGOUT : `${BASE_URL}/api/v1/user/logout`
};


export const jobEndPoints = {
  GET_ALL_JOBS : `${BASE_URL}/api/v1/job/findAllJob`,
  GET_JOB_BY_KEYWORD : `${BASE_URL}/api/v1/job/findAllJobByKeyword`,
  GET_JOB_BY_JOBID : `${BASE_URL}/api/v1/job/findJobById` ,
  GET_ADMIN_JOBS : `${BASE_URL}/api/v1/job/findAdminJobs` ,
  CREATE_JOB : `${BASE_URL}/api/v1/job/createJob`
}


export const applicationEndPoints = {
  APPLY_JOB : `${BASE_URL}/api/v1/application/applyJobb` ,
  GET_APPLICANTS : `${BASE_URL}/api/v1/application/applicants` ,
  UPDATE_STATUS : `${BASE_URL}/api/v1/application/updateStatus` ,
  GET_APPLIED_JOBS : `${BASE_URL}/api/v1/application/getAppliedJobs`
}

export const companyEndPoints = {
  CREATE_COMPANY : `${BASE_URL}/api/v1/company/register`,
  UPDATE_COMPANY_DETAILS : `${BASE_URL}/api/v1/company/updateCompany`,
  GET_ALL_COMPANIES : `${BASE_URL}/api/v1/company/getComapanies`,
  GET_COMPANY_BY_ID : `${BASE_URL}/api/v1/company/getCompany`
}