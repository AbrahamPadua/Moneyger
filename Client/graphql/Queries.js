import { gql } from "@apollo/client"

export const LOAD_USERS = gql`
  query {
    getQuote {
      author
      quote
    }
  }
`

export default LOAD_USERS