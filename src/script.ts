import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const newProject = await prisma.project.create({
    data: {
      title: "Todo List",
      description: "The famous todo list!",
    },
  })
  const allProjects = await prisma.project.findMany()
  console.log(allProjects)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
