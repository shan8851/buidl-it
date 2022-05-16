import { Flex, Stack } from "@chakra-ui/react"
import { Footer } from "./Footer"
import { Header } from "./Header"

export const Layout = ({ children }) => {
  return (
    <Flex
      color="gray.100"
      bg="gray.800"
      direction="column"
      minH="100vh"
      w="100vw"
    >
      <Header />
      <Stack p={2} flex={1}>
        {children}
      </Stack>
      <Footer />
    </Flex>
  )
}
