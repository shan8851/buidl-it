import { ProjectForm } from "../components/ProjectForm"
import { Layout } from "../components/Layout"
import {
  Button,
  Center,
  Flex,
  Text,
  useDisclosure,
  Spinner,
  Badge,
  Container,
  useToast,
} from "@chakra-ui/react"
import { FiPlusCircle } from "react-icons/fi"
import { useMutation, useQuery } from "@apollo/client"
import { useState } from "react"
import { GET_USER_OBJECT } from "../gql/user"
import { DELETE_MUTATION } from "../gql/project"

export const MyProjects = () => {
  const [deleteId, setDeleteId] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const toast = useToast()

  const { data, loading, error } = useQuery(GET_USER_OBJECT)

  const [deleteProject] = useMutation(DELETE_MUTATION, {
    variables: {
      id: deleteId,
    },
    refetchQueries: [GET_USER_OBJECT],
  })

  const onDelete = (id) => {
    console.log("hello", data)
    setDeleteId(id)
    setTimeout(() => {
      deleteProject()
      toast({
        title: "Project deleted",
        description: "We're sorry to see it go 😞",
        status: "success",
        duration: 9000,
        isClosable: true,
        variant: "left-accent",
        position: "top",
      })
    }, 1000)
  }

  if (loading) return <Spinner />
  if (error) return `Something went wrong! ${error.message}`
  return (
    <Layout>
      <Center my={"40px"}>
        <Flex direction="column" alignItems="center">
          <Text fontWeight="black" fontSize={["2xl", "6xl"]} textAlign="center">
            👋 {data.getUser.name && data.getUser.name}
          </Text>
          <Container centerContent>
            {" "}
            <Text fontSize={["sm", "md", "xl"]} textAlign="center">
              Thanks for sharing your project ideas with BuildIt{" "}
              {data.getUser.name && data.getUser.name.split(" ")[0]}. At the
              moment you can add or delete more here. Edit functionality is
              coming soon.
            </Text>
          </Container>
        </Flex>
      </Center>

      {data &&
        data.getUser.projects.map((project) => (
          <Flex key={project.id} justifyContent="center">
            <Container p={4} my={4} border="1px" rounded="lg" w="full">
              <Badge colorScheme="green">Title:</Badge>
              <Text fontSize="2xl" fontWeight="extrabold" my={2}>
                {" "}
                {project.title}
              </Text>
              <Badge colorScheme="green">Description:</Badge>
              <Text my={2}> {project.description}</Text>
              <Flex justifyContent="space-between">
                <Button
                  isDisabled={true}
                  px={2}
                  size="sm"
                  colorScheme="green"
                  w="48%"
                  onClick={() => console.log("edit")}
                >
                  Edit
                </Button>
                <Button
                  px={2}
                  size="sm"
                  colorScheme="green"
                  w="48%"
                  onClick={() => onDelete(project.id)}
                >
                  Delete
                </Button>
              </Flex>
            </Container>
          </Flex>
        ))}

      {data && !data.getUser.projects && (
        <Flex justifyContent="center" direction="column" alignItems="center">
          {" "}
          <Button
            leftIcon={<FiPlusCircle />}
            colorScheme="green"
            onClick={onOpen}
            mt={4}
          >
            Add a project
          </Button>
        </Flex>
      )}

      {data && (
        <Flex alignItems="center" direction="column" justifyContent="center">
          {data.getUser.projects.length < 1 && (
            <Text
              fontSize={["sm", "md", "xl"]}
              textAlign="center"
              fontWeight="bold"
            >
              You have not created any projects yet
            </Text>
          )}

          <Button
            leftIcon={<FiPlusCircle />}
            colorScheme="green"
            onClick={onOpen}
            mt={4}
          >
            Add a project
          </Button>
        </Flex>
      )}

      <ProjectForm onClose={onClose} isOpen={isOpen} />
    </Layout>
  )
}
