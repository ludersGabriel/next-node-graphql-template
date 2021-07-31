import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export interface Context {
  user: {
    id: string,
    role: string,
    count: number
  } | null
}
