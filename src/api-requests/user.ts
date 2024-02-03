import axiosFetch from "../utils/axios-fetch";
import LocalCache from "../utils/local-cache";


const { VITE_API_URL } = import.meta.env;

export const getUserProfile = async () => {
  const token = LocalCache.get('userToken')
  return await axiosFetch.get({ url: `${VITE_API_URL}/accounts/user`, headers:{'user_token': token}});
}


export const getUserOrganizationsAndRoles = async () =>

  await axiosFetch.get({
    url: `${VITE_API_URL}/api/studio-service/organization/user/roles`,
  });
  

  export const logoutUser = async () =>{
    const token = LocalCache.get('userToken')
    await axiosFetch.post({ url: `${VITE_API_URL}/auth/logout`,headers:{'user_token': token} });
  }