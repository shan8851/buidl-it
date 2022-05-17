import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Layout } from "../components/Layout"
import { Button, Flex, Heading, Input, Text, Spinner } from "@chakra-ui/react"
import { useMutation } from "@apollo/client"
import { AUTH_TOKEN } from "../constants"
import { SIGNUP_MUTATION } from "../gql/auth"

export const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  })

  const { name, email, password, password2 } = formData

  const navigate = useNavigate()

  const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    },
    onCompleted: ({ signup }) => {
      localStorage.setItem(AUTH_TOKEN, signup.token)
      navigate("/my-projects")
    },
  })

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== password2) {
      console.log("passwords do not match")
    } else {
      signup()
    }
  }

  if (loading) return <Spinner />
  if (error) return `Submission error! ${error.message}`

  return (
    <Layout>
      <Flex
        flex={1}
        alignItems="center"
        justifyContent="center"
        direction="column"
        maxW="600px"
        mx="auto"
      >
        <Heading size="2xl">Register</Heading>
        <Text textAlign="center" fontSize="lg" mt={5}>
          Please create an account, this allows you to submit projects and
          manage any projects you have created.
        </Text>
        <form onSubmit={onSubmit}>
          <Input
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder="Enter your name..."
            onChange={onChange}
            my={2}
          />
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
          <Input
            type="password"
            id="password2"
            name="password2"
            value={password2}
            placeholder="Enter your repeat your password..."
            onChange={onChange}
            my={2}
          />
          <Button width={"full"} colorScheme="green" type="submit">
            Register
          </Button>
        </form>
      </Flex>
    </Layout>
  )
}
