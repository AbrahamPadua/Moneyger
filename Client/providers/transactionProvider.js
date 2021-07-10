import { API, JSONPOSTAUTH } from "../app-helper";

const transactionProvider = {
  getTransactions: async () => {
    // if (!JWTStorage.getToken()) await JWTStorage.getRefreshedToken();
    const res = await fetch(`${API}/api/users/transaction`, JSONPOSTAUTH());
    const data = await res.json();
    // IF SUCCESS
    if (res.status < 400) return data.data;
    // IF FAILED
    console.log(data);
    return null;
  },
  getTransaction: async (id) => {
    const res = await fetch(`${API}/api/users/transaction`, JSONPOSTAUTH({ id }));
    const data = await res.json();
    return res.status < 400 ? data.data : null
  },
  createTransaction: async (transaction) => {
    const res = await fetch(
      `${API}/api/users/add-transaction`,
      JSONPOSTAUTH(transaction)
    );
    return res.status >= 400 ? true : false;
  },
};

export default transactionProvider;
