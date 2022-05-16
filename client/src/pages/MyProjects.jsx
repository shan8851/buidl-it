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
import { useQuery } from "@apollo/client"
import { GET_USER_PROJECTS } from "../gql/queries"

export const MyProjects = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const toast = useToast()

  const user = { name: "shan" }

  const { data, loading, error } = useQuery(GET_USER_PROJECTS, {
    variables: { id: 1 },
  })

  const onDelete = (id) => {
    console.log(id)
    toast({
      title: "Project deleted",
      description: "We're sorry to see it go 😞",
      status: "success",
      duration: 9000,
      isClosable: true,
      variant: "left-accent",
      position: "top",
    })
  }

  if (loading) return <Spinner />
  //if (error) return `Something went wrong! ${error.message}`
  return (
    <Layout>
      {console.log("user", data)}
      <Center my={"40px"}>
        <Flex direction="column" alignItems="center">
          <Text fontWeight="black" fontSize={["2xl", "6xl"]} textAlign="center">
            👋 {user && user.name}
          </Text>
          <Container centerContent>
            {" "}
            <Text fontSize={["sm", "md", "xl"]} textAlign="center">
              Thanks for sharing your project ideas with BuildIt{" "}
              {user && user.name.split(" ")[0]}. At the moment you can add or
              delete more here. Edit functionality is coming soon.
            </Text>
          </Container>
        </Flex>
      </Center>

      {/* {projData.length > 0 &&
        projData.map((project) => (
          <Flex justifyContent="center">
            <Container
              key={project._id}
              p={4}
              my={4}
              border="1px"
              rounded="lg"
              w="full"
            >
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
                  onClick={() => onDelete(project._id)}
                >
                  Delete
                </Button>
              </Flex>
            </Container>
          </Flex>
        ))} */}

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

      {/* {projData.length < 1 && (
        <Flex alignItems="center" direction="column">
          <Text
            fontSize={["sm", "md", "xl"]}
            textAlign="center"
            fontWeight="bold"
          >
            You have not created any projects yet
          </Text>
          <Button
            leftIcon={<FiPlusCircle />}
            colorScheme="green"
            onClick={onOpen}
            mt={4}
          >
            Add a project
          </Button>
        </Flex>
      )} */}

      <ProjectForm onClose={onClose} isOpen={isOpen} />
    </Layout>
  )
}
