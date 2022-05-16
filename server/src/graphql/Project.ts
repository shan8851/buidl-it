import {
  extendType,
  nonNull,
  objectType,
  stringArg,
  intArg,
  inputObjectType,
  enumType,
  arg,
  list,
} from "nexus"
import { Prisma } from "@prisma/client"

// Leaving client to handle sort, so allowing all options here
export const ProjectOrderByInput = inputObjectType({
  name: "ProjectOrderByInput",
  definition(t) {
    t.field("title", { type: Sort })
    t.field("description", { type: Sort })
    t.field("createdAt", { type: Sort })
  },
})

export const Sort = enumType({
  name: "Sort",
  members: ["asc", "desc"],
})

export const ProjectList = objectType({
  name: "ProjectList",
  definition(t) {
    t.nonNull.list.nonNull.field("projects", { type: Project }),
      t.nonNull.int("count"),
      t.id("id")
  },
})

export const Project = objectType({
  name: "Project",
  definition(t) {
    t.nonNull.int("id")
    t.nonNull.string("title")
    t.nonNull.string("description")
    t.nonNull.string("difficulty")
    t.nonNull.list.nonNull.field("stories", {
      type: "String",
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
  },
})

export const ProjectQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("allProjects", {
      type: "ProjectList",
      args: {
        filter: stringArg(),
        skip: intArg(),
        take: intArg(),
        orderBy: arg({ type: list(nonNull(ProjectOrderByInput)) }),
      },
      async resolve(parent, args, context) {
        const where = args.filter
          ? {
              OR: [
                { description: { contains: args.filter } },
                { title: { contains: args.filter } },
              ],
            }
          : {}

        const projects = await context.prisma.project.findMany({
          where,
          skip: args?.skip as number | undefined,
          take: args?.take as number | undefined,
          orderBy: args?.orderBy as
            | Prisma.Enumerable<Prisma.ProjectOrderByWithRelationInput>
            | undefined,
        })

        const count = await context.prisma.project.count({ where })
        const id = `PROJECTS:${JSON.stringify(args)}`

        return {
          projects,
          count,
          id,
        }
      },
    })
  },
})

export const UserProjectQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("userProjects", {
      type: "Project",
      args: {
        id: nonNull(intArg()),
      },
      async resolve(parent, args, context) {
        return await context.prisma.project.findMany({
          where: { postedById: args.id },
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
        description: nonNull(stringArg()),
        stories: nonNull(list(nonNull(stringArg()))),
        title: nonNull(stringArg()),
        difficulty: nonNull(stringArg()),
      },
      resolve(parent, args, context) {
        const { userId } = context

        if (!userId) {
          throw new Error("Cannot add project without logging in.")
        }
        const newProject = context.prisma.project.create({
          data: {
            title: args.title,
            description: args.description,
            difficulty: args.difficulty,
            stories: args.stories,
            postedBy: { connect: { id: userId } },
          },
        })
        return newProject
      },
    })
    t.nonNull.field("update", {
      type: "Project",
      args: {
        id: nonNull(intArg()),
        description: stringArg(),
        stories: list(nonNull(stringArg())),
        title: stringArg(),
      },
      async resolve(parent, args, context) {
        const { userId } = context
        const projectToUpdate = await context.prisma.project.findUnique({
          where: { id: args.id },
        })
        if (!userId) {
          throw new Error("Cannot update project without logging in.")
        }

        if (userId !== projectToUpdate?.postedById) {
          throw new Error("Cannot update project you did not create.")
        }
        return context.prisma.project.update({
          where: { id: args.id },
          data: {
            title: args.title ? args.title : undefined,
            description: args.description ? args.description : undefined,
            stories: args.stories ? args.stories : undefined,
          },
        })
      },
    })
    t.nonNull.field("delete", {
      type: "Project",
      args: {
        id: nonNull(intArg()),
      },
      async resolve(parent, args, context) {
        const { userId } = context
        const projectToDelete = await context.prisma.project.delete({
          where: { id: args.id },
        })
        if (!userId) {
          throw new Error("Cannot delete a project without logging in")
        }
        if (userId !== projectToDelete?.postedById) {
          throw new Error("Cannot delete project you did not create.")
        }
        return projectToDelete
      },
    })
  },
})
