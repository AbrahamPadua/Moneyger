import client from "../graphql/client";
import { TQuery, TsQuery } from "../graphql/queries";

const transactionProvider = {
  getTransactions: async () => {
    const uid = localStorage.getItem("uid");
    const { loading, error, data } = await client.query({
      query: TsQuery,
      variables: { uid },
    });
    return loading | error ? null : data.getTransactions;
  },
  getTransaction: async (id) => {
    const uid = localStorage.getItem("uid");
    const { loading, error, data } = await client.query({
      query: TQuery,
      variables: { uid, tid: id },
    });
    if (!loading) {
      if (!error) {
        console.log(data);
        return data.getTransaction;
      }
      console.log(error);
      return null;
    }
    return null;
  },
};

export default transactionProvider;
