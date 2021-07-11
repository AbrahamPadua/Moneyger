import { gql } from "@apollo/client"

export const addT = gql`
  mutation ($uid: ID!, $input: TransactionInput!) {
    addTransaction (userId: $uid, input: $input)
  }
`

export const addC = gql`
  mutation ($uid: ID!, $input: CategoryInput!) {
    addCategory (userId: $uid, input: $input)
  }
`