import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { AuthenticationError } from 'apollo-server'
import { Context } from '@src/context'
import { userRepo } from '@components/user/user.repo'

export const hash = (str: string): Promise<string> => bcrypt.hash(str, 12)

export const checkPassword = (
  inputPassword: string,
  hashedPassword: string
):Promise<boolean> => bcrypt.compare(inputPassword, hashedPassword)

const getTokenPayload = (token: string) => {
  try {
    return jwt.verify(token, process.env.APP_SECRET || '') as any
  } catch {
    return { user: null }
  }
}

export const getUser = (token: string) => {
  return getTokenPayload(token)
}

export const AuthError = () => new AuthenticationError('user not authenticaded')

export const RoleError = () => new AuthenticationError('wrong permissions to use this endpoint')

export const checkAuth = async (ctx: Context, roleCheck = '') => {
  if (!ctx.user) throw AuthError()

  if (roleCheck && ctx.user?.role !== roleCheck) throw RoleError()

  const user = await userRepo.user(ctx.user?.id)

  if (ctx.user?.count !== user?.count) throw AuthError()
}
