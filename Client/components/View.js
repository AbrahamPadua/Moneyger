import Head from "next/head";
import NavBar from "./NavBar";
import Styles from "../styles/Home.module.scss";
import { useState, useEffect } from "react";
import Router from "next/router";
import auth from "../providers/authProvider";

const View = ({ title, children }) => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
    // Hide the navbar if the user is in dashboard
    const showNavRoutes = { login: "login", register: "register", "": "home" };
    if (auth.isLoggedIn() && Router.route.slice(1) in showNavRoutes) {
      // Redirect user to dashboard if logged in
      Router.push("/dashboard");
    }
  }, []);

  if (!hasMounted) return null;

  return (
    <>
      <Head>
        <title key="title-tag">{title}</title>
        <meta
          key="title-meta"
          name="viewport"
          content="initial-scale=1.0,width=device-width"
        />
      </Head>
      <NavBar />
      <div>{children}</div>
    </>
  );
};

export default View;
