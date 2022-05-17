import { useQuery } from "@apollo/client"
import { Spinner, Flex, Container, Badge, Text } from "@chakra-ui/react"
import { GET_ALL_PROJECTS_QUERY } from "../gql/project"

export const ProjectList = () => {
  const { data, loading, error } = useQuery(GET_ALL_PROJECTS_QUERY)

  if (loading) return <Spinner />
  if (error) return `Something went wrong! ${error.message}`
  return (
    <>
      {data.allProjects.projects.map((project) => (
        <Flex justifyContent="center" key={project.id}>
          <Container p={4} my={4} border="1px" rounded="lg">
            <Badge colorScheme="green">Difficulty:</Badge>
            <Text my={2}> {project.difficulty}</Text>
            <Badge colorScheme="green">Title:</Badge>
            <Text fontSize="2xl" fontWeight="extrabold" my={2}>
              {" "}
              {project.title}
            </Text>
            <Badge colorScheme="green">Description:</Badge>
            <Text my={2}> {project.description}</Text>
            {project.stories.length > 0 && (
              <>
                <Badge colorScheme="green">User Stories:</Badge>
                {project.stories.map((story) => (
                  <Text my={2} key={story}>
                    🔨 {story}
                  </Text>
                ))}
              </>
            )}
          </Container>
        </Flex>
      ))}
    </>
  )
}
