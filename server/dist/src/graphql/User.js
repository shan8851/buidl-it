"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserById = exports.UserQuery = exports.User = void 0;
const nexus_1 = require("nexus");
exports.User = (0, nexus_1.objectType)({
    name: "User",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("name");
        t.nonNull.string("email");
        t.nonNull.list.nonNull.field("projects", {
            type: "Project",
            resolve(parent, args, context) {
                return context.prisma.user
                    .findUnique({ where: { id: parent.id } })
                    .projects();
            },
        });
    },
});
exports.UserQuery = (0, nexus_1.extendType)({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("allUsers", {
            type: "User",
            resolve(parent, args, context) {
                return context.prisma.user.findMany();
            },
        });
    },
});
exports.GetUserById = (0, nexus_1.extendType)({
    type: "Query",
    definition(t) {
        t.field("getUserById", {
            type: "User",
            args: {
                id: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
            },
            async resolve(parent, args, context) {
                return await context.prisma.user.findUnique({
                    where: { id: args.id },
                });
            },
        });
    },
});
//# sourceMappingURL=User.js.map