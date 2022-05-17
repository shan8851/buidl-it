import {
  Badge,
  Button,
  Center,
  Container,
  Flex,
  Spinner,
  Text,
} from "@chakra-ui/react"
import { Layout } from "../components/Layout"
import { FaUserAlt, FaSignInAlt } from "react-icons/fa"
import { useQuery } from "@apollo/client"
import { GET_ALL_PROJECTS_QUERY } from "../gql/project"
import { useNavigate } from "react-router-dom"
import { AUTH_TOKEN } from "../constants"

export const Home = () => {
  const navigate = useNavigate()
  const { data, loading, error } = useQuery(GET_ALL_PROJECTS_QUERY)
  const authToken = localStorage.getItem(AUTH_TOKEN)

  if (loading) return <Spinner />
  if (error) return `Something went wrong! ${error.message}`
  return (
    <Layout>
      <Center mb="20px">
        <Text fontWeight="black" fontSize={["2xl", "6xl"]}>
          Welcome to
        </Text>{" "}
        <Text
          fontWeight="black"
          fontSize={["2xl", "6xl"]}
          color="green.400"
          as="u"
          ml={2}
        >
          Buidl-It
        </Text>
      </Center>
      <Flex justifyContent="center">
        <Container mb="20px">
          <Text fontSize={["sm", "md", "xl"]} textAlign="center">
            We're all about making it easier for developers to level up their
            skills and build out a portfolio. That's why we created Buidl\ it -
            a website full of project ideas for developers to get started on.
          </Text>
        </Container>
      </Flex>
      {!authToken && (
        <>
          <Flex justifyContent="center">
            <Container mb="20px">
              <Text fontSize={["sm", "md", "xl"]} textAlign="center">
                Got a cool project idea you would like to share? Sign up/login
                and submit your own.
              </Text>
            </Container>
          </Flex>
          <Flex justifyContent="center" mb="20px">
            <Button
              onClick={() => navigate("/login")}
              mr={2}
              rightIcon={<FaUserAlt />}
              colorScheme="green"
            >
              Sign Up
            </Button>
            <Button
              onClick={() => navigate("/login")}
              ml={2}
              rightIcon={<FaSignInAlt />}
              colorScheme="green"
            >
              Login
            </Button>
          </Flex>
        </>
      )}
      <Text fontWeight="black" fontSize={["2xl", "6xl"]} textAlign="center">
        👷 Projects
      </Text>

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
    </Layout>
  )
}
