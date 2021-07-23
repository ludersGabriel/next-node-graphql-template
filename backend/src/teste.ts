import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main () {
  // await prisma.user.create(({
  //   data: {
  //     email: 'teste@gmail.com',
  //     password: '1234mudar',
  //     name: 'bala de goma'
  //   }
  // }))

  // const allUsers = await prisma.user.findMany()

  // const allUsers = await prisma.user.update({
  //   where: {
  //     id: '435166be-bc39-49b4-874f-6920a70451fd'
  //   },
  //   data: {
  //     name: 'new name'
  //   }
  // })

  // console.log(allUsers)
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
