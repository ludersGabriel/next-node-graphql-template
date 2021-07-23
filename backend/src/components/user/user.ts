import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
export class User {
  @Field((type) => ID)
  id: string

  @Field()
  email: string

  @Field()
  name: string
}