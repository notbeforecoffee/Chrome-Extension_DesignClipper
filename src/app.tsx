/* global chrome */

import { MemoryRouter } from "react-router-dom";

import { Button } from "@fulhaus/react.components.button";

import openURL from "./utils/open-url";
import useLoginStatus from "./hooks/use-login-status";
import AppRoutes from "./app-routes";
import Logo from "../public/assets/images/fhLogo.png";


const App = () => {

  const { VITE_ACCOUNTS_URL } = import.meta.env;
  
  const [isLoading, loggedIn] = useLoginStatus();

  
  
  const initiateAuthentication = async () => {
    if (!isLoading && !loggedIn) {
      // if (true) {

      const queryOptions = { 
        active: true, 
        currentWindow: true 
      };
      const [tab] = await chrome.tabs.query(queryOptions);

      let returnUrl = tab.url;
      console.log('return url: ', tab.url)

      // provides current window location as the returnUrl upon login
      openURL({
        url: `${VITE_ACCOUNTS_URL}/login?redirectURL=${returnUrl}`,
//         chrome.webNavigation.onCompleted:
// chrome.webNavigation - Chrome Developers[^]

      });
    }
  };

  return isLoading || !loggedIn ? (
  // return isLoading || loggedIn ? (
   
    <div className="">
      {isLoading && <div>Loading...</div>}

      {!loggedIn && (
        //  {loggedIn && (

        <div>
          <header className="bg-[#101828] w-full text-center text-white text-xl p-2">
            Fülhaus Studio Clipper
          </header>

          <img 
          className="w-1/3 m-auto my-20" 
          src={Logo} 
          alt="Fulhaus Logo" 
          />

          <div className="my-20">
            <Button
              variant={"filled"}
              className={"m-auto rounded bg-[#101828]"}
              onClick={initiateAuthentication}
            >
              Please Log In
            </Button>
            <p className="text-center mt-4 px-10">
              You will be taken to the Fülhaus Accounts Login Page
            </p>
          </div>
        </div>
      )}
    </div>
  ) : (
    <MemoryRouter>
      <AppRoutes />
    </MemoryRouter>
  );
};

export default App;
