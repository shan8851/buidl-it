import { extendType, nonNull, objectType, stringArg, list } from "nexus"
import { NexusGenObjects } from "../../nexus-typegen"

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
  },
})

export const ProjectQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("allProjects", {
      type: "Project",
      resolve(parent, args, context, info) {
        return context.prisma.project.findMany()
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
        const newProject = context.prisma.project.create({
          data: {
            title: args.title,
            description: args.description,
          },
        })
        return newProject
      },
    })
  },
})
