import { gql } from "@apollo/client";

export const quoteQuery = gql`
  query {
    getQuote {
      author
      quote
    }
  }
`;

export const TsQuery = gql`
  query getTransactions($uid: ID!) {
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
  query ($uid: ID!) {
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
