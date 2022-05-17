import { gql } from "@apollo/client"

export const GET_ALL_PROJECTS_QUERY = gql`
  {
    allProjects {
      id
      count
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

export const DELETE_MUTATION = gql`
  mutation delete($id: Int!) {
    delete(id: $id) {
      id
      title
    }
  }
`
