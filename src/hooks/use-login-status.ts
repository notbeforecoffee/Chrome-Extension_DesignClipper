import { useEffect, useState } from "react";
import { getUserProfile } from "../api-requests/user";
import LocalCache from "../utils/local-cache";
import useLocationSearch from "./use-location-search";



const useLoginStatus = () => {
  // const token = useLocationSearch('_fulhaus_token')
  const [loading, setLoading] = useState<boolean>(true);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);


  useEffect(() => {
  //  if (token) LocalCache.set('userToken', token)
    getCurrentUserProfile();
  }, []
  );

  const getCurrentUserProfile = async () => {
    const userProfile = LocalCache.get("userProfile");

    if (userProfile) {
      setLoggedIn(true);
      setLoading(false);
      return;
    }

    const response = await getUserProfile();

    if (response.success) {
      LocalCache.set('userProfile', response.data)
      setLoggedIn(true);
    }

    if (!response.success) setLoggedIn(false);

    setLoading(false);
  };
  return [loading, loggedIn] as const;
  };


export default useLoginStatus;
