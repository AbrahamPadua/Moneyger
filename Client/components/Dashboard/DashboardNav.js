import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Router from "next/router";
import Link from "next/link";
import Styles from "../../styles/Dashboard.module.scss"

const DashboardNav = ({ Styles }) => {

  const links = [
    { link: "dashboard", icon: "tachometer-alt" },
    { link: "transactions", icon: "exchange-alt" },
    { link: "categories", icon: "list" },
    { link: "reports", icon: "chart-pie" },
    { link: "goals", icon: "trophy" },
    { link: "budgets", icon: "money-bill-wave" },
    { link: "settings", icon: "cogs" },
    { link: "logout", icon: "sign-out-alt" },
  ];

  return (
    <>
      <nav id="dashNav" className={Styles.dashNav}>
        <ul>
          {links.map((li) => (
            <NavLink {...li} key={li.link} title={li.link.toUpperCase()} />
          ))}
        </ul>
      </nav>
    </>
  );
};

const NavLink = ({ link, icon, title }) => {
  const [active, setActive] = useState("dashboard")

  useEffect(() => {
    const route = Router.route
    setActive(route.slice(1))
  }, [])

  link = link === "breakdown" ? "categories/breakdown" : link;
  return (
    <li className={active === link ? Styles.active : ""}>
      <Link href={`/${link}`}>
        <a >
          <FontAwesomeIcon icon={["fas", icon]} size="lg" />
          <span>{title}</span>
        </a>
      </Link>
    </li>
  );
};

export default DashboardNav;
