import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs"
import Styles from "../styles/Transaction.module.scss"

const TransactTable = ({
  amount,
  description,
  category,
  dateAdded: date,
  id,
  balanceAfterTransaction,
}) => {
  return (
    <>
      <tr>
        <td className={Styles.category}>
          <div style={{ backgroundColor: category.icon.color }}>
            <FontAwesomeIcon
              icon={["fas", category.icon.name]}
              className={Styles.icon}
            />
          </div>
        </td>
        {category.type.match(/expense/i) ? (
          <td className={Styles.expense}> -₱{amount} </td>
        ) : (
          <td className={Styles.income}>+₱{amount}</td>
        )}
        <td>{description}</td>
        <td>₱{balanceAfterTransaction}</td>
        <td>{dayjs(date).format("MM/DD/YY")}</td>
        <td>
          <a href={`/transaction/?id=${id}`}>
            <button type="button">View</button>
          </a>
        </td>
      </tr>
    </>
  );
};

export default TransactTable