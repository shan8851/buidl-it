import * as jwt from "jsonwebtoken"
import { APP_SECRET } from "../secret"

export interface AuthTokenPayload {
  userId: number
}

export function decodeAuthHeader(authHeader: String): AuthTokenPayload {
  const token = authHeader.replace("Bearer ", "")

  if (!token) {
    throw new Error("No token found")
  }
  return jwt.verify(token, APP_SECRET) as AuthTokenPayload
}
