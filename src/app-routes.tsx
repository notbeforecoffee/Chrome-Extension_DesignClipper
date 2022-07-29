import { createContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginContext } from "./hooks/loginContext";
import { UnitTray } from './pages/unitTray/UnitTray';
import WebForm from './pages/webForm/Form';


// export const LoginContext = createContext()




const AppRoutes = () => {
const [fulhausSite, setFulhausSite ] = useState<boolean>(false)

  return (
    <Routes>
      <LoginContext.Provider value={{fulhausSite, setFulhausSite}}>

      {/* <Route index element={<WebForm />} />  */}
      <Route index element= {fulhausSite ? <UnitTray /> : <WebForm />} />
      </LoginContext.Provider>
    
    </Routes>
  );
};

export default AppRoutes;
/* Vector */


