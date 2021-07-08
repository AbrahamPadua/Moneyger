// FUNCTIONS
import { useEffect } from "react";
import auth from "../auth/authProvider";
// COMPONENTS
import View from "../components/View";
// STYLING
import "../styles/globals.scss";
import "bootstrap/scss/bootstrap.scss";
// ICONS
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

function MyApp({ Component, pageProps }) {
  // useEffect(async () => {
  //   auth.checkAuth();
  // }, []);
  return (
    <>
      <View title="Budget Tracker App"></View>;
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
