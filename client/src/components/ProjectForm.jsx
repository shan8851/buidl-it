import { useState } from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Select,
  Textarea,
  Flex,
  IconButton,
  useToast,
} from "@chakra-ui/react"
import { FaPlus } from "react-icons/fa"
import { useMutation } from "@apollo/client"
import { ADD_PROJECT_MUTATION, GET_ALL_PROJECTS_QUERY } from "../gql/project"
import { GET_USER_OBJECT } from "../gql/user"

export const ProjectForm = ({ isOpen, onClose }) => {
  const [storyValue, setStoryValue] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "",
    stories: [],
    examples: [],
  })

  const { title, description, difficulty, stories } = formData

  const toast = useToast()

  const [add, { loading, error }] = useMutation(ADD_PROJECT_MUTATION, {
    variables: {
      title,
      description,
      difficulty,
      stories,
    },
    refetchQueries: [
      { query: GET_USER_OBJECT },
      { query: GET_ALL_PROJECTS_QUERY },
    ],
  })

  const onSubmit = (e) => {
    e.preventDefault()
    add()
    console.log(formData)
    onClose()
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleAddStory = () => {
    stories.push(storyValue)
    toast({
      title: "User story added.",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top",
      variant: "left-accent",
    })
    setStoryValue("")
  }

  return (
    <Modal size="full" isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="gray.800" color="gray.100">
        <ModalHeader>Add a project</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={onSubmit}>
            <FormControl isRequired my={4}>
              <FormLabel htmlFor="difficulty">Difficulty</FormLabel>
              <Select
                placeholder="Select difficulty"
                name="difficulty"
                onChange={onChange}
                value={difficulty}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </Select>
              <FormHelperText>Select the level of difficulty.</FormHelperText>
            </FormControl>
            <FormControl isRequired my={4}>
              <FormLabel htmlFor="title">Project Title</FormLabel>
              <Input
                id="title"
                type="text"
                name="title"
                value={title}
                placeholder="Please enter a title"
                onChange={onChange}
              />
              <FormHelperText>
                Try and give a nice and descriptive title.
              </FormHelperText>
            </FormControl>
            <FormControl isRequired my={4}>
              <FormLabel htmlFor="title">Project Description</FormLabel>
              <Textarea
                id="description"
                type="text"
                value={description}
                name="description"
                placeholder="Please enter a description"
                onChange={onChange}
                size="lg"
                resize="vertical"
              />
              <FormHelperText>
                Again the more details the better. Describe the goal of the
                project here.
              </FormHelperText>
            </FormControl>
            <Flex alignItems="center">
              <FormControl w="80%" flex={1} my={4}>
                <FormLabel htmlFor="story">Add a user story</FormLabel>
                <Input
                  id="story"
                  type="text"
                  name="story"
                  value={storyValue}
                  placeholder="Please enter a description"
                  onChange={(e) => setStoryValue(e.target.value)}
                  size="sm"
                  resize="vertical"
                />
                <FormHelperText>Add user stories one at a time</FormHelperText>
              </FormControl>
              <IconButton
                colorScheme="green"
                aria-label="Add Story"
                onClick={() => handleAddStory()}
                icon={<FaPlus />}
                ml={4}
              />
            </Flex>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose} variant="outline" colorScheme="green">
            Cancel
          </Button>
          <Button colorScheme="green" ml={3} onClick={onSubmit}>
            Create Project
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
