import { Button, Center, Container, Flex, Text } from "@chakra-ui/react"
import { Layout } from "../components/Layout"
import { FaUserAlt, FaSignInAlt } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { AUTH_TOKEN } from "../utils/constants"
import { ProjectList } from "../components/ProjectList"

export const Home = () => {
  const navigate = useNavigate()
  const authToken = localStorage.getItem(AUTH_TOKEN)

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

      <ProjectList />
    </Layout>
  )
}
