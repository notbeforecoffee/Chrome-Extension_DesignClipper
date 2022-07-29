/* global chrome */
import { useEffect } from "react";
import { MemoryRouter } from "react-router-dom";
import AppRoutes from "./app-routes";
import "./App.css";
import useLoginStatus from "./hooks/use-login-status";

import openURL from "./utils/open-url";

const App = () => {
  const [isLoading, loggedIn] = useLoginStatus();
  const { VITE_ACCOUNTS_URL, VITE_STUDIO_URL } = import.meta.env;

  // http://127.0.0.1:5001/

  useEffect(() => {
    // initiateAuthentication();

    //Redirect to accounts page if user is not logged in
  }, [isLoading, loggedIn]);

  const initiateAuthentication = async () => {

    // if (!isLoading && !loggedIn) {
    if (true) {
      const queryOptions = { active: true, lastFocusedWindow: true };
      const [tab] = await chrome.tabs.query(queryOptions);

      let returnUrl = tab.url;

      // provides current window location as the returnUrl upon login
      openURL({
        url: `${VITE_ACCOUNTS_URL}/login?redirectURL=${returnUrl}`,
      });
    }
  };

  const handleLogin = () => { initiateAuthentication() };

  return isLoading || !loggedIn ? (

    // <div>Loading...</div>
    <div>
      {isLoading && <div>Loading...</div>}

      {!loggedIn && <button onClick={handleLogin}></button>}
    </div>
  ) : (
    // <div> you are logged in </div>

    <MemoryRouter>
      <AppRoutes />
    </MemoryRouter>

  );
};

export default App;
