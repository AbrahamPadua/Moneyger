import { gql } from "@apollo/client";

export const quoteQuery = gql`
  query {
    getQuote {
      author
      quote
    }
  }
`;

export const TQuery = gql`
  query getT ($uid: ID!, $tid: ID!) {
    getTransaction (userId: $uid, transactionId: $tid) {
      id
      amount
      description
      dateAdded
      balanceAfterTransaction
      category {
        name
        type
        icon {
          name
          color
        }
      }
    }
  }
`

export const TsQuery = gql`
  query getTs ($uid: ID!) {
    getTransactions(userId: $uid) {
      id
      amount
      description
      dateAdded
      balanceAfterTransaction
      category {
        name
        type
        icon {
          name
          color
        }
      }
    }
  }
`;

export const CsQuery = gql`
  query getCs ($uid: ID!) {
    getCategories (userId: $uid) {
      id
      name
      type
      icon {
        name
        color
      }
    }
  }
`;

// export const
