import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const hash = (str: string): Promise<string> => bcrypt.hash(str, 12)

async function main () {
  await prisma.user.upsert({
    where: { email: 'testUser_1@todo.io' },
    update: {},
    create: {
      email: 'testeUser_1@todo.io',
      name: 'testUser_1',
      password: await hash('1234mudar')
    }
  })

  await prisma.user.upsert({
    where: { email: 'testUser_2@todo.io' },
    update: {},
    create: {
      email: 'testUser_2@todo.io',
      name: 'testUser_2',
      password: await hash('1234mudar')
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
