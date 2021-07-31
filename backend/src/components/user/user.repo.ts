import { prisma } from '@src/context'
import { UserRegisterInput, UserUpdateInput, User, PrivateUser } from './user.dto'

export class UserRepo {
  private readonly prisma = prisma

  async registerUser (
    data: UserRegisterInput
  ): Promise<User> {
    return this.prisma.user.create({
      data
    })
  }

  async updateUser (
    data: UserUpdateInput
  ): Promise<User> {
    return this.prisma.user.update({
      where: {
        id: data.id
      },
      data
    })
  }

  async deleteUser (
    id: string
  ): Promise<User> {
    return this.prisma.user.delete({
      where: {
        id
      }
    })
  }

  async user (
    id: string
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id
      }
    })
  }

  async userByEmail (
    email: string
  ): Promise<PrivateUser | null> {
    return this.prisma.user.findUnique({
      where: {
        email
      }
    })
  }

  async users (): Promise<User[]> {
    return this.prisma.user.findMany()
  }
}

export const userRepo = new UserRepo()
