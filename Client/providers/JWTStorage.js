import { API } from "../app-helper";

const JWTStorageManager = () => {
  const logoutEvent = "ra-logout";
  let JWT = null;
  let refreshTimeOutId;

  global.window && // Just to work around 'window not defined' error
    // This listener allows to disconnect another session of react started in another tab
    window.addEventListener("storage", (e) => {
      if (e.key === logoutEvent) {
        eraseToken();
      }
    });

  const getToken = () => JWT;

  const setToken = (token, delay) => {
    JWT = token;
    refreshToken(delay);
    return true;
  };

  const eraseToken = (changeEvent = false) => {
    JWT = null;
    abortRefreshToken();
    changeEvent ? localStorage.setItem(logoutEvent, Date.now()) : null;
    return true;
  };

  // This countdown feature is used to renew the JWT in a way that is transparent to the user.
  // before it's no longer valid
  const refreshToken = (delay) => {
    refreshTimeOutId =
      global.window &&
      window.setTimeout(
        getRefreshedToken,
        delay * 1000 - 5000 // Validity period of the token in seconds, minus 5 seconds
      );
  };

  const abortRefreshToken = () => {
    if (refreshTimeOutId) {
      window.clearTimeout(refreshTimeOutId);
    }
  };

  const getRefreshedToken = async () => {
    const res = await fetch(`${API}/api/users/refresh_token`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (res.status !== 200) {
      eraseToken();
      // console.log(await res.text());
      // console.clear();
      return false;
    } else {
    }

    const { data } = await res.json();
    const { token, tokenExpiry } = data;

    if (token) {
      setToken(token, tokenExpiry);
      return true;
    }

    return false;
  };

  const handleReload = async () => {
    const loggedIn = global.window && localStorage.getItem("uid");
    if (loggedIn && !getToken()) {
      abortRefreshToken();
      await getRefreshedToken();
    }
  };

  return {
    eraseToken,
    getToken,
    setToken,
    getRefreshedToken,
    handleReload,
  };
};

export default JWTStorageManager();
