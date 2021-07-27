import { User, UserRegisterInput, UserUpdateInput } from './user.dto'
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Context } from '../../context'
import { hash } from '@utils/auth'
import { userRepo } from './user.repo'

@Resolver(User)
export class UserResolver {
  private readonly userRepo = userRepo

  @Mutation(() => User)
  async registerUser (
    @Arg('data') data: UserRegisterInput
  ): Promise<User> {
    const hashedPassword = await hash(data.password)

    return this.userRepo.registerUser(
      {
        email: data.email,
        name: data.name,
        password: hashedPassword
      }
    )
  }

  @Mutation(() => User, { nullable: true })
  async updateUser (
    @Arg('data') data: UserUpdateInput,
    @Ctx() ctx: Context
  ) {
    if (data?.password) {
      data.password = await hash(data.password)
    }

    return ctx.prisma.user.update({
      where: {
        id: data.id
      },
      data
    })
  }

  @Mutation(() => User, { nullable: true })
  async deleteUser (
    @Arg('id') id: string,
    @Ctx() ctx: Context
  ) {
    return ctx.prisma.user.delete({
      where: {
        id
      }
    })
  }

  @Query(() => User, { nullable: true })
  async user (
    @Arg('id') id: string,
    @Ctx() ctx: Context
  ) {
    return ctx.prisma.user.findUnique({
      where: {
        id
      }
    })
  }

  @Query(() => [User])
  async users (
    @Ctx() ctx: Context
  ) {
    return ctx.prisma.user.findMany()
  }
}
