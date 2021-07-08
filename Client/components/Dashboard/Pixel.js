import { useContext } from "react";
import { DashData } from "../../Contexts";
import Styles from "../../styles/Dashboard.module.scss";
import moment from "moment";

const Pixel = ({ date, amount, numOfTransactions: noOfRecs }) => {
  const { setPixelDate } = useContext(DashData);

  let red = 219;
  let green = 255;
  let blue = 243;

  if (amount > 0) {
    red = 153;
    green = 240;
    blue = 211;
  } else if (amount < 0) {
    red = 218;
    green = 164;
    blue = 164;
  }

  return (
    <div
      id={`${date.getTime()}`}
      style={{ backgroundColor: `rgb(${red}, ${green}, ${blue})` }}
      className={Styles.pixel}
      onClick={() => setPixelDate(date)}
    >
      <span
        className={Styles.pixelText}
      ><i>{moment(date).format("MMM DD, YYYY")}</i>{`${noOfRecs} ${noOfRecs > 1 ? `Transactions` : `Transaction`}`}</span>
    </div>
  );
};

export default Pixel;
