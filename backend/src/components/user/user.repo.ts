import { context } from 'src/context'
import { UserRegisterInput } from './user.dto'

export class UserRepo {
  private readonly prisma = context.prisma

  async registerUser (
    data: UserRegisterInput
  ) {
    return this.prisma.user.create({
      data
    })
  }
}

export const userRepo = new UserRepo()
