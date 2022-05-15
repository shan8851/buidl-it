import { useQuery } from "@apollo/client"
import { GET_ALL_PROJECTS } from "./gql/queries"

export const App = () => {
  const { data } = useQuery(GET_ALL_PROJECTS)
  return (
    <div>
      <button onClick={() => console.log(data)}>click</button>
    </div>
  )
}
