"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectMutation = exports.UserProjectQuery = exports.ProjectQuery = exports.Project = exports.ProjectList = exports.Sort = exports.ProjectOrderByInput = void 0;
const nexus_1 = require("nexus");
// Leaving client to handle sort, so allowing all options here
exports.ProjectOrderByInput = (0, nexus_1.inputObjectType)({
    name: "ProjectOrderByInput",
    definition(t) {
        t.field("title", { type: exports.Sort });
        t.field("description", { type: exports.Sort });
        t.field("createdAt", { type: exports.Sort });
    },
});
exports.Sort = (0, nexus_1.enumType)({
    name: "Sort",
    members: ["asc", "desc"],
});
exports.ProjectList = (0, nexus_1.objectType)({
    name: "ProjectList",
    definition(t) {
        t.nonNull.list.nonNull.field("projects", { type: exports.Project }),
            t.nonNull.int("count"),
            t.id("id");
    },
});
exports.Project = (0, nexus_1.objectType)({
    name: "Project",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("title");
        t.nonNull.string("description");
        t.nonNull.string("difficulty");
        t.nonNull.list.nonNull.field("stories", {
            type: "String",
        });
        t.nonNull.dateTime("createdAt");
        t.field("postedBy", {
            type: "User",
            resolve(parent, args, context) {
                return context.prisma.project
                    .findUnique({ where: { id: parent.id } })
                    .postedBy();
            },
        });
    },
});
exports.ProjectQuery = (0, nexus_1.extendType)({
    type: "Query",
    definition(t) {
        t.nonNull.field("allProjects", {
            type: "ProjectList",
            args: {
                filter: (0, nexus_1.stringArg)(),
                skip: (0, nexus_1.intArg)(),
                take: (0, nexus_1.intArg)(),
                orderBy: (0, nexus_1.arg)({ type: (0, nexus_1.list)((0, nexus_1.nonNull)(exports.ProjectOrderByInput)) }),
            },
            async resolve(parent, args, context) {
                const where = args.filter
                    ? {
                        OR: [
                            { description: { contains: args.filter } },
                            { title: { contains: args.filter } },
                            { difficulty: { contains: args.filter } },
                        ],
                    }
                    : {};
                const projects = await context.prisma.project.findMany({
                    where,
                    skip: args === null || args === void 0 ? void 0 : args.skip,
                    take: args === null || args === void 0 ? void 0 : args.take,
                    orderBy: args === null || args === void 0 ? void 0 : args.orderBy,
                });
                const count = await context.prisma.project.count({ where });
                const id = `PROJECTS:${JSON.stringify(args)}`;
                return {
                    projects,
                    count,
                    id,
                };
            },
        });
    },
});
exports.UserProjectQuery = (0, nexus_1.extendType)({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("userProjects", {
            type: "Project",
            args: {
                id: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
            },
            async resolve(parent, args, context) {
                return await context.prisma.project.findMany({
                    where: { postedById: args.id },
                });
            },
        });
    },
});
exports.ProjectMutation = (0, nexus_1.extendType)({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("add", {
            type: "Project",
            args: {
                description: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                stories: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)((0, nexus_1.stringArg)()))),
                title: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                difficulty: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
            },
            resolve(parent, args, context) {
                const { userId } = context;
                if (!userId) {
                    throw new Error("Cannot add project without logging in.");
                }
                const newProject = context.prisma.project.create({
                    data: {
                        title: args.title,
                        description: args.description,
                        difficulty: args.difficulty,
                        stories: args.stories,
                        postedBy: { connect: { id: userId } },
                    },
                });
                return newProject;
            },
        });
        t.nonNull.field("update", {
            type: "Project",
            args: {
                id: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
                description: (0, nexus_1.stringArg)(),
                stories: (0, nexus_1.list)((0, nexus_1.nonNull)((0, nexus_1.stringArg)())),
                title: (0, nexus_1.stringArg)(),
            },
            async resolve(parent, args, context) {
                const { userId } = context;
                const projectToUpdate = await context.prisma.project.findUnique({
                    where: { id: args.id },
                });
                if (!userId) {
                    throw new Error("Cannot update project without logging in.");
                }
                if (userId !== (projectToUpdate === null || projectToUpdate === void 0 ? void 0 : projectToUpdate.postedById)) {
                    throw new Error("Cannot update project you did not create.");
                }
                return context.prisma.project.update({
                    where: { id: args.id },
                    data: {
                        title: args.title ? args.title : undefined,
                        description: args.description ? args.description : undefined,
                        stories: args.stories ? args.stories : undefined,
                    },
                });
            },
        });
        t.nonNull.field("delete", {
            type: "Project",
            args: {
                id: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
            },
            async resolve(parent, args, context) {
                const { userId } = context;
                const projectToDelete = await context.prisma.project.delete({
                    where: { id: args.id },
                });
                if (!userId) {
                    throw new Error("Cannot delete a project without logging in");
                }
                if (userId !== (projectToDelete === null || projectToDelete === void 0 ? void 0 : projectToDelete.postedById)) {
                    throw new Error("Cannot delete project you did not create.");
                }
                return projectToDelete;
            },
        });
    },
});
//# sourceMappingURL=Project.js.map