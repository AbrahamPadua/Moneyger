import { gql } from "@apollo/client"

export const addT = gql`
  mutation ($uid: ID!, $input: TransactionInput!) {
    addTransaction (userId: $uid, input: $input)
  }
`