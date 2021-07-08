import { useEffect, useState, useContext } from "react";
import WEEKDAYS from "../../data/weekdays";
import WORDS from "../../data/words";
import Styles from "../../styles/Dashboard.module.scss";
import { DashData } from "../../Contexts";

const DashboardTitle = () => {
  const [word, setWord] = useState("Great");
  const { quote } = useContext(DashData)

  useEffect(async () => {
    if (!quote) {
      let changeWord = setInterval(() => {
        let newWord;
        let notSame = false;
        while (!notSame) {
          newWord = Math.floor(Math.random() * WORDS.length);
          if (newWord != word) notSame = true;
        }
        setWord(WORDS[newWord]);
      }, 1000);
      return () => {
        global.window && clearInterval(changeWord);
      };
    }
  }, [quote]);

  return (
    <section className={Styles.dashHead}>
      {quote ? (
        <>
          <h6><i>Qoute Of The Day</i></h6>
          <h1>"{quote.quote}"</h1>
          <h3> - {quote.author}</h3>
        </>
      ) : (
        <h1>
          Have a <span>{word}</span> {WEEKDAYS[new Date().getDay()]}!
        </h1>
      )}
    </section>
  );
};



export default DashboardTitle;
