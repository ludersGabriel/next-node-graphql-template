import { gql } from '@apollo/client'
import client from '../apollo/apollo-client'

const INFO = gql`
  query InfoQuery{
    info
  }
`

export const info = async (): Promise<string> => {
  const { data } = await client.query({
    query: INFO
  })

  return data?.info
}
