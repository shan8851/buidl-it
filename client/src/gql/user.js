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

export const GET_USER_QUERY = gql`
  query getUserById($id: Int!) {
    getUserById(id: $id) {
      id
      name
      email
      projects {
        id
        title
        description
        difficulty
        stories
        createdAt
        postedBy {
          name
          email
          id
        }
      }
    }
  }
`
