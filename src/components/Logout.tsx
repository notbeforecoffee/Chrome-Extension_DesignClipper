import { useNavigate } from 'react-router-dom';

import { logoutUser } from "@api-requests/user";
import removeUserProfile from "@utils/logout-user";

import { FiLogOut } from "react-icons/fi";


const Logout = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    removeUserProfile()
    logoutUser();
    const { VITE_ACCOUNTS_URL, VITE_STUDIO_URL } = import.meta.env;
    navigate('./login', {});

    // location.reload()
  };


  return (
    <div>
      <div>
       <FiLogOut className='cursor-pointer text-xl' onClick={()=> handleLogout()} /> 
      </div>
    </div>
  );
};
export default Logout
