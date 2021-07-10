import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import { API } from "../app-helper"

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql Error ${message}.`)
    })
  }
})

const link = from([
  errorLink,
  new HttpLink({ uri: `${API}/graphql` })
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
})

export default client