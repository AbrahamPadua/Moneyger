// FUNCTIONS
import { useContext } from "react";
import dayjs from "dayjs";
// CONTEXT
import { DashData } from "../../Contexts";
// STYLING
import Styles from "../../styles/Dashboard.module.scss";

const Pixel = ({ date, amount, numOfT }) => {
  const { setPixelDate } = useContext(DashData);

  let pColor = { r: 219, g: 255, b: 243 };

  if (amount > 0) pColor = { r: 153, g: 240, b: 211 };
  if (amount < 0) pColor = { r: 218, g: 164, b: 164 };

  return (
    <div
      id={`${date.getTime()}`}
      style={{ backgroundColor: `rgb(${pColor.r}, ${pColor.g}, ${pColor.b})` }}
      className={Styles.pixel}
      onClick={() => setPixelDate(date)}
    >
      <span className={Styles.pixelText}>
        <i>{dayjs(date).format("MMM DD, YYYY")}</i>
        {`${numOfT} ${numOfT > 1 ? `Transactions` : `Transaction`}`}
      </span>
    </div>
  );
};

export default Pixel;
