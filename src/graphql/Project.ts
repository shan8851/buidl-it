import { extendType, nonNull, objectType, stringArg, intArg, list } from "nexus"

export const Project = objectType({
  name: "Project",
  definition(t) {
    t.nonNull.int("id")
    t.nonNull.string("title")
    t.nonNull.string("description")
    t.field("stories", {
      type: list("String"),
    })
    t.field("examples", {
      type: list("String"),
    })
    t.nonNull.dateTime("createdAt")
    t.field("postedBy", {
      type: "User",
      resolve(parent, args, context) {
        return context.prisma.project
          .findUnique({ where: { id: parent.id } })
          .postedBy()
      },
    })
    t.nonNull.list.nonNull.field("voters", {
      type: "User",
      resolve(parent, args, context) {
        return context.prisma.project
          .findUnique({ where: { id: parent.id } })
          .voters()
      },
    })
  },
})

export const ProjectQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("allProjects", {
      type: "Project",
      args: {
        filter: stringArg(),
        skip: intArg(),
        take: intArg(),
      },
      resolve(parent, args, context) {
        const where = args.filter
          ? {
              OR: [
                { description: { contains: args.filter } },
                { title: { contains: args.filter } },
              ],
            }
          : {}
        return context.prisma.project.findMany({
          where,
          skip: args?.skip as number | undefined,
          take: args?.take as number | undefined,
        })
      },
    })
  },
})

export const ProjectMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("add", {
      type: "Project",
      args: {
        title: nonNull(stringArg()),
        description: nonNull(stringArg()),
      },
      resolve(parent, args, context) {
        const { title, description } = args
        const { userId } = context
        if (!userId) {
          throw new Error("Cannot add project without logging in")
        }
        const newProject = context.prisma.project.create({
          data: {
            title: args.title,
            description: args.description,
            postedBy: { connect: { id: userId } },
          },
        })
        return newProject
      },
    })
  },
})
