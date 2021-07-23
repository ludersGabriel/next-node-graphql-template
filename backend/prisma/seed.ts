import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main () {
  await prisma.user.upsert({
    where: { email: 'testUser_1@todo.io' },
    update: {},
    create: {
      email: 'testeUser_1@todo.io',
      name: 'testUser_1',
      password: 'testUser_1'
    }
  })

  await prisma.user.upsert({
    where: { email: 'testUser_2@todo.io' },
    update: {},
    create: {
      email: 'testUser_2@todo.io',
      name: 'testUser_2',
      password: 'testUser_2'
    }
  })
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
