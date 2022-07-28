import axiosFetch from "../utils/axios-fetch";
import LocalCache from "../utils/local-cache";


const { VITE_API_URL } = import.meta.env;

export const getUserProfile = async () => {
  const token = LocalCache.get('userToken')
  return await axiosFetch.get({ url: `${VITE_API_URL}/accounts/user`, headers:{'user_token': token}});
}
