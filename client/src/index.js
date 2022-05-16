import React from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App"
import { ChakraProvider } from "@chakra-ui/react"
import reportWebVitals from "./reportWebVitals"
import "./index.css"
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { AUTH_TOKEN } from "./constants"

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  if (!token) return { headers: { ...headers } }
  else {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null,
      },
    }
  }
})

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

const container = document.getElementById("root")
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ChakraProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
