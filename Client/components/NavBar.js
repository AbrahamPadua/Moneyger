import { Navbar } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import auth from "../providers/authProvider";
import { useEffect, useState } from "react";
import Styles from "../styles/Nav.module.scss";
import Router from "next/router";

const NavBar = () => {
  let { isLoggedIn } = auth;
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [hideNav, setHideNav] = useState(false);

  useEffect(() => {
    const validRoutes = { login: "", register: "", "": "" };
    const route = Router.route.slice(1);
    if (!(route in validRoutes)) setHideNav(true);

    setLoggedIn(isLoggedIn());
  }, [isLoggedIn()]);

  return (
    <>
      {hideNav ? (
        <></>
      ) : (
        <Navbar id="main-nav" expand="lg" fixed="top" className={Styles.navbar}>
          <Navbar.Brand>
            <Image
              src="/images/logo.png"
              alt="Moneyger Logo"
              width={50}
              height={50}
            />
          </Navbar.Brand>
          {!loggedIn ? (
            <>
              <Link href="/login">
                <a className="nav-link ms-auto">Login</a>
              </Link>
              <Link href="/register">
                <a className="nav-link">Register</a>
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard">
                <a className="nav-link ms-auto">Dashboard</a>
              </Link>
              <Link href="/logout">
                <a className="nav-link">Logout</a>
              </Link>
            </>
          )}
          <Navbar.Text></Navbar.Text>
        </Navbar>
      )}
    </>
  );
};

export default NavBar;
