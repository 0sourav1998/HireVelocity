const BASE_URL = import.meta.env.VITE_BASE_URL;

console.log(BASE_URL)
export const userEndPoints = {
  SIGNUP: `${BASE_URL}/api/v1/user/register`,
  LOGIN: `${BASE_URL}/api/v1/user/login`,
};
