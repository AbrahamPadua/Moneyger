import { API, JSONPOSTAUTH } from "../app-helper";
import client from "../graphql/client";
import { TsQuery } from "../graphql/queries";

const transactionProvider = {
  getTransactions: async () => {
    const { loading, error, data } = await client.query({ query: TsQuery, variables: { uid: localStorage.getItem("uid") } })
    console.log(data)
    return loading | error ? null : data.getTransactions
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
