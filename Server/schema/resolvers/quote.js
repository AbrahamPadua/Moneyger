import Quote from "../../models/quote";

const quoteResolver = {
  getQuote: async () => {
    const today = new Date();
    const quotes = await Quote.find({});

    try {
      // CHECK IF THERE IS NO QUOTE OF THE DAY IN THE DATABASE
      // OR IF IT'S DATE IS NOT VALID
      if (!quotes.length || !moment(today).isSame(quotes[0].date, "day")) {
        if (quotes.length) await Quote.findByIdAndDelete(quotes[0]._id)
        const res = await fetch(
          `http://quotes.rest/qod.json?category=management`
        );
        const data = await res.json();
        const { quote, author, date } = data.contents.quotes[0];
        const newQuote = new Quote({ quote, author, date: new Date(date) });
        await newQuote.save();
        return newQuote;
      } else {
        // RETURN QUOTE IF VALID
        return quotes[0];
      }
    } catch (err) {
      console.log(err)
      return null;
    }
  }
}

export default quoteResolver