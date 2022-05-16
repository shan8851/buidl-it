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
        stories
        createdAt
        postedBy {
          name
          email
        }
      }
    }
  }
`

export const GET_USER_PROJECTS = gql`
  query UserProjects($id: Int!) {
    userProjects(id: $id) {
      id
      title
    }
  }
`
