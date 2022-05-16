import { InMemoryCache, makeVar } from "@apollo/client"
import { AUTH_TOKEN, USER_OBJECT } from "./constants"

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
            return getUserVar()
          },
        },
      },
    },
  },
})

export const isLoggedInVar = makeVar(!!localStorage.getItem(AUTH_TOKEN))
export const getUserVar = makeVar({})
