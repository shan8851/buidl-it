import { gql } from "@apollo/client"

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`

export const GET_USER_OBJECT = gql`
  query GetUserObject {
    getUser @client
  }
`
