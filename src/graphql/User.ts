import { objectType } from "nexus"

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
    t.nonNull.list.nonNull.field("votes", {
      type: "Project",
      resolve(parent, args, context) {
        return context.prisma.user
          .findUnique({ where: { id: parent.id } })
          .votes()
      },
    })
  },
})
