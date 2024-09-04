const BASE_URL = import.meta.env.VITE_BASE_URL;


export const userEndPoints = {
  SIGNUP: `${BASE_URL}/api/v1/user/register`,
  LOGIN: `${BASE_URL}/api/v1/user/login`,
  UPDATE_PROFILE : `${BASE_URL}/api/v1/user/updateProfile`,
  LOGOUT : `${BASE_URL}/api/v1/user/logout`
};


export const jobEndPoints = {
  GET_ALL_JOBS : `${BASE_URL}/api/v1/job/findAllJob`,
  GET_JOB_BY_JOBID : `${BASE_URL}/api/v1/job/findJobById`
}


export const applicationEndPoints = {
  APPLY_JOB : `${BASE_URL}/api/v1/application/applyJobb`
}