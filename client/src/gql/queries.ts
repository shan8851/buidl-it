import { gql } from "@apollo/client"

export const GET_ALL_PROJECTS = gql`
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
