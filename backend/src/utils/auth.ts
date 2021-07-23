import bcrypt from 'bcryptjs'

export const hash = (str: string) => bcrypt.hash(str, 12)
