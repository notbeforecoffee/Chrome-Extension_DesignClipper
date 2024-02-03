import LocalCache from "./local-cache";



 const removeUserProfile = () => {
 
  LocalCache.clear('userProfile');
    return {};
  }

  export default removeUserProfile