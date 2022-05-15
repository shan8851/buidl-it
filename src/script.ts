import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const newProject = await prisma.project.create({
    data: {
      title: "SOME PROJECT",
      description: "Some Description",
      stories: ["STORY"],
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
