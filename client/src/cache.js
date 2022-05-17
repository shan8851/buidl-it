import { InMemoryCache, makeVar } from "@apollo/client"
import { AUTH_TOKEN } from "./constants"

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar()
          },
        },
        getUser: {
          read() {
            return getUserIdVar()
          },
        },
      },
    },
  },
})

export const isLoggedInVar = makeVar(!!localStorage.getItem(AUTH_TOKEN))
export const getUserIdVar = makeVar()
