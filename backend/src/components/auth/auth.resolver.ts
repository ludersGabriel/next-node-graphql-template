import jwt from 'jsonwebtoken'
import { userRepo } from '../user/user.repo'
import { Arg, Mutation, Resolver } from 'type-graphql'
import { LoginInput } from './auth.dto'
import { AuthenticationError } from 'apollo-server'
import { checkPassword } from '@utils/auth'

@Resolver(String)
export class AuthResolver {
  private readonly userRepo = userRepo
  private readonly secret = process.env.APP_SECRET || ''

  @Mutation(() => String)
  async login (
    @Arg('data') data: LoginInput
  ): Promise<string> {
    const user = await this.userRepo.userByEmail(data.email)
    if (!user) throw new AuthenticationError('invalid user')

    const isValid = await checkPassword(data.password, user.password)
    if (!isValid) throw new AuthenticationError('invalid password')

    userRepo.updateUser({
      id: user.id,
      count: user.count + 1
    })

    const token = jwt.sign(
      { user: { id: user.id, role: user.role, count: user.count + 1 } },
      this.secret,
      {
        expiresIn: '7d'
      }
    )

    return token
  }
}
