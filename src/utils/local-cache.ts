class LocalCache {
  
//add timer to clear cache after 1d: initialize function

  // const setWithExpiry = (key: string, value: any, ttl:number) => {
  //   const now = new Date();
  //   const item = {
  //     value: value,
  //     expiry: now.getTime() + ttl,
  //   };
  //   localStorage.setItem(key, JSON.stringify(item));
  // };


    // setWithExpiry("key", value, 300000);


//function to be used when retrieving item from storage.  Compares current time to ttl, to verify if item has expired

    // const getWithExpiry = (key: any) => {
    //   const itemStr = localStorage.getItem(key);
    //   if (!itemStr) {
    //     return null;
    //   }    
    //   const item = JSON.parse(itemStr);
    //   const now = new Date();
    //   if (now.getTime() > item.expiry) {
    //     localStorage.removeItem(key);
    //     return null;
      // } 


  static get = (key: string) => {
    const serializedUserProfile: any = localStorage.getItem(key);
    try {
      return JSON.parse(serializedUserProfile);
    } catch (error) {
      return serializedUserProfile;
    }
  };

  static set = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  static clear = (key: string) => {
    localStorage.removeItem(key);
    
  };
}

export default LocalCache;
