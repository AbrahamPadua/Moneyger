import Pixel from "../components/Dashboard/Pixel";
import Styles from "../styles/Dashboard.module.scss"
import dayjs from "dayjs"

const pixelProvider = {
  createTable: function (data) {
    const WEEKS = 52;
    const table = [[], [], [], [], [], [], [], []];
    let date = new Date();
    let today = new Date(date);

    // Iterate through each week
    for (let i = 0; i <= WEEKS; i++) {
      if (date.toDateString() === today.toDateString()) {
        for (let j = today.getDay() + 1; j >= 0; j--) {
          if (j === 0) {
            table[j].unshift(this.createMonth(date))
            date.setDate(date.getDate() - 1);
            continue
          }
          const newPixel = this.createPixel(data, date);
          table[j].unshift(newPixel);
          if (j != 1)
            date.setDate(date.getDate() - 1);
        }
      } else {
        for (let j = 7; j >= 0; j--) {
          if (j === 0) {
            table[j].unshift(this.createMonth(date))
            date.setDate(date.getDate() - 1);
            continue
          }
          const newPixel = this.createPixel(data, date);
          table[j].unshift(newPixel);
          if (j != 1)
            date.setDate(date.getDate() - 1);
        }
      }
    }

    return table.map((row) => (
      <div key={Math.random()} className={Styles.pixelsRow}>
        {row}
      </div>
    ));
  },

  createPixel: (data, date) => {
    let newDate = new Date(date.toDateString());
    let amount = 0;
    let numOfT = 0;
    if (data) {
      // Get the transaction on the current date
      let onDateTransacts = data.filter((transact) => {
        let transactDate = new Date(transact.dateAdded).toDateString();
        return new Date(transactDate).getTime() == newDate.getTime();
      });
      if (onDateTransacts.length) {
        // Increment the amount on
        onDateTransacts.forEach((transact) => {
          amount =
            transact.category.type.toLowerCase() == "income"
              ? amount + transact.amount
              : amount - transact.amount;
        });
        numOfT = onDateTransacts.length;
      }
    }

    return (
      <Pixel
        key={newDate.getTime()}
        date={newDate}
        amount={amount}
        numOfT={numOfT}
      ></Pixel>
    );
  },
  createMonth: (date) => {
    let month;
    if (dayjs(date).month() == 10 && dayjs(date).date() == 1) {
      console.log(date)
    }
    if (dayjs(date).date() <= 7) {
      month = dayjs(date).format("MMM")
    }
    return <div key={date.toISOString()} className={Styles.pixelMonth}>{month}</div>
  }
}

export default pixelProvider;