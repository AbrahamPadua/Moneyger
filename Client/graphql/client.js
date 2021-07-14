import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { API } from "../app-helper";
import JWTStorage from "../providers/JWTStorage";

const errorLink = onError((err) => {
  console.log(err)
  if (err.graphqlErrors) {
    console.log(err.graphqlErrors);
    err.graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql Error ${message}.`);
    });
  }
  if (err.networkError) {
    console.log(err.networkError);
  }
});

const link = from([
  errorLink,
  new HttpLink({
    uri: `${API}/graphql`,
    headers: {
      authorization: JWTStorage.getToken()
        ? `Bearer ${JWTStorage.getToken()}`
        : "",
    },
  }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default client;
