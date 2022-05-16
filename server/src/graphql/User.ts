import { extendType, intArg, list, nonNull, objectType } from "nexus"

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.int("id")
    t.nonNull.string("name")
    t.nonNull.string("email")
    t.nonNull.list.nonNull.field("projects", {
      type: "Project",
      resolve(parent, args, context) {
        return context.prisma.user
          .findUnique({ where: { id: parent.id } })
          .projects()
      },
    })
  },
})

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("allUsers", {
      type: "User",
      resolve(parent, args, context) {
        return context.prisma.user.findMany()
      },
    })
  },
})

export const GetUserByID = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("getUser", {
      type: "User",
      args: {
        id: nonNull(intArg()),
      },
      async resolve(parent, args, context) {
        return await context.prisma.user.findUnique({
          where: { id: args.id },
        })
      },
    })
  },
})
