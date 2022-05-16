import { gql } from "@apollo/client"

export const SIGNUP_MUTATION = gql`
  mutation signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        name
        id
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
  }
`

export const DELETE_MUTATION = gql`
  mutation deleteProject($id: Int!) {
    deleteProject(id: $id) {
      id
      title
    }
  }
`

export const ADD_PROJECT_MUTATION = gql`
  mutation add(
    $title: String!
    $difficulty: String!
    $description: String!
    $stories: [String!]!
  ) {
    add(
      title: $title
      difficulty: $difficulty
      description: $description
      stories: $stories
    ) {
      id
      title
    }
  }
`
