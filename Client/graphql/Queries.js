import { gql } from "@apollo/client"

export const quoteQuery = gql`
  query {
    getQuote {
      author
      quote
    }
  }
`

export const TsQuery = gql`
  query getTransactions ($userId: ID!) {
    getTransactions (userId: $userId) {
      transactions {
        amount
        description
        dateAdded
        balanceAfterTransaction
        category {
          name
          icon {
            name
            color
          }
        }
      }
    }
  }
`;

// export const