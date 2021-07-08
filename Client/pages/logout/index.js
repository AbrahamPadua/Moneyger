import { useEffect } from "react";
import Router from "next/router";
import auth from "../../auth/authProvider";

const Logout = () => {
  useEffect(async () => {
    await auth.logout();
    Router.push("/login");
  }, []);
  return null;
};

export default Logout;
