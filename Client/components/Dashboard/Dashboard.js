// COMPONENTS
import View from "../View";
import DashboardNav from "./DashboardNav";
// STYLING
import Styles from "../../styles/Dashboard.module.scss";
import { useEffect } from "react";
import authProvider from "../../auth/authProvider";
import Router from "next/router";

const Dashboard = ({ title, children }) => {
  useEffect(() => {
    // Go to Login page if user is not logged in
    if (!authProvider.isLoggedIn()) {
      Router.push("/login");
    }
  }, []);

  return (
    <View title={`Moneyger | ${title}`}>
      <DashboardNav Styles={Styles} />
      <main className={Styles.dashMain}>
        <div>{children}</div>
      </main>
    </View>
  );
};

export default Dashboard;
