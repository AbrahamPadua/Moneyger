import { API, POSTAUTH } from "../app-helper";

const quoteProvider = {
  getQuote: async () => {
    const url = `${API}/users/quote-of-the-day`;
    const res = await fetch(url, POSTAUTH({ method: "GET" }));
    const data = await res.json();
    if (res.status < 400) return data.data;
    return null;
  },
};

export default quoteProvider;
