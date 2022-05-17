import { useMutation } from "@apollo/client"
import { Button, Flex, Heading, Input, Text, Spinner } from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUserIdVar, isLoggedInVar } from "../cache"
import { Layout } from "../components/Layout"
import { AUTH_TOKEN, USER_ID } from "../constants"
import { LOGIN_MUTATION } from "../gql/auth"

export const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const { email, password } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formData.email,
      password: formData.password,
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.token)
      localStorage.setItem(USER_ID, login.user.id)
      isLoggedInVar(true)
      getUserIdVar(login.user.id)
      navigate("/my-projects")
    },
  })

  if (loading) return <Spinner />
  if (error) return `Submission error! ${error.message}`
  return (
    <Layout>
      <Flex
        flex={1}
        alignItems="center"
        justifyContent="center"
        direction="column"
        maxW="800px"
        mx="auto"
      >
        <Heading size="2xl">login</Heading>
        <Text textAlign="center" fontSize="lg" mt={5}>
          Please enter your email and password to login
        </Text>
        <form onSubmit={onSubmit}>
          <Input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="Enter your email..."
            onChange={onChange}
            my={2}
          />
          <Input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="Enter your password..."
            onChange={onChange}
            my={2}
          />
          <Button width={"full"} colorScheme="green" onClick={login}>
            login
          </Button>
        </form>
      </Flex>
    </Layout>
  )
}
