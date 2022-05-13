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

let projects: NexusGenObjects["Project"][] = [
  // 1
  {
    id: 1,
    title: "Todo List",
    description: "Fancy todo list",
    stories: ["1", "2", "3"],
    examples: ["1", "2", "3"],
  },
  {
    id: 2,
    title: "Full stack",
    description: "App",
    stories: ["1", "2", "3"],
    examples: ["1", "2", "3"],
  },
]

export const ProjectQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("allProjects", {
      type: "Project",
      resolve(parent, args, context, info) {
        return projects
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

        let idCount = projects.length + 1
        const project = {
          id: idCount,
          title: title,
          description: description,
        }
        projects.push(project)
        return project
      },
    })
  },
})
