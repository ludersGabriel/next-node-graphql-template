import { User } from './user'
import { Arg, Ctx, Field, ID, InputType, Mutation, Query, Resolver } from 'type-graphql'
import { Context } from '../../context'
import { hash } from '@utils/auth'
import { IsEmail, MinLength } from 'class-validator'

@InputType()
class UserRegisterInput {
  @Field()
  @IsEmail()
  email: string

  @Field() password: string

  @Field() name: string
}

@InputType()
class UserUpdateInput {
  @Field(() => ID) id: string
  @Field({ nullable: true }) name?: string

  @Field({ nullable: true })
  @IsEmail()
  email?: string

  @Field({ nullable: true })
  @MinLength(8)
  password?: string
}

@Resolver(User)
export class UserResolver {
  @Mutation(() => User)
  async registerUser (
    @Arg('data') data: UserRegisterInput,
    @Ctx() ctx: Context
  ): Promise<User> {
    const hashedPassword = await hash(data.password)

    return ctx.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword
      }
    })
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
