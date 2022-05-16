import { Flex, Link, Text } from "@chakra-ui/react"

export const Footer = () => {
  return (
    <footer>
      <Flex justifyContent="center" alignItems="center" p={5}>
        <Text fontSize={["sm", "md", "lg"]}>
          Built with ❤️ & ☕ by{" "}
          <Link
            fontWeight="black"
            color="green.400"
            href="https://twitter.com/shan8851"
          >
            @shan8851
          </Link>
        </Text>
      </Flex>
    </footer>
  )
}
