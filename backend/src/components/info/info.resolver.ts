import { Resolver, Query } from 'type-graphql'

@Resolver()
export class InfoResolver {
  @Query(() => String)
  async info () {
    console.log('[+] Query Info Running')
    return 'Here you see the info query from the graphql backend'
  }
}
