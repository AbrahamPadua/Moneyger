import React from "react";
import Styles from "../../styles/Dashboard.module.scss";

const Weekdays = () => {
  return (
    <ul className={Styles.weekdays}>
      <li>Sun</li>
      <li>Mon</li>
      <li>Tue</li>
      <li>Wed</li>
      <li>Thu</li>
      <li>Fri</li>
      <li>Sat</li>
    </ul>
  );
};

export default Weekdays;
