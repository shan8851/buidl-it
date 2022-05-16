import { Link as RouterLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { FaSignOutAlt } from "react-icons/fa"
import { Button, Flex, Heading, Link } from "@chakra-ui/react"
import { AUTH_TOKEN } from "../constants"

export const Header = () => {
  const navigate = useNavigate()
  const authToken = localStorage.getItem(AUTH_TOKEN)

  return (
    <header>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        px={[5, 10]}
        py={[2, 5]}
      >
        <Link as={RouterLink} to="/">
          <Heading fontSize={["sm", "lg", "2xl"]}>👷 Buidl-It 🛠️</Heading>
        </Link>
        <Flex alignItems="center">
          {authToken ? (
            <>
              {" "}
              <Link as={RouterLink} to="/my-projects">
                My Projects
              </Link>
              <Button
                leftIcon={<FaSignOutAlt />}
                colorScheme="green"
                variant="solid"
                onClick={() => {
                  localStorage.removeItem(AUTH_TOKEN)
                  navigate(`/`)
                }}
                ml={4}
                size="sm"
              >
                logout
              </Button>
            </>
          ) : (
            <>
              <Link as={RouterLink} to="/login">
                Login
              </Link>

              <Link ml={2} alignItems="center" as={RouterLink} to="/register">
                Register
              </Link>
            </>
          )}
        </Flex>
      </Flex>
    </header>
  )
}
