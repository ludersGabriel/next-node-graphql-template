import { context } from 'src/context'
import { UserRegisterInput, UserUpdateInput, User } from './user.dto'

export class UserRepo {
  private readonly prisma = context.prisma

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

  async users (): Promise<User[]> {
    return this.prisma.user.findMany()
  }
}

export const userRepo = new UserRepo()
