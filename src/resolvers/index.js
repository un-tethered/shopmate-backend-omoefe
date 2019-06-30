import { extractFragmentReplacements } from 'prisma-binding'
import Query from './Query'
import Mutation from './Mutation'
import Customer from './Customer'

const resolvers = {
  Query,
  Mutation,
  Customer
}

const fragmentReplacements = extractFragmentReplacements(resolvers)

export { fragmentReplacements, resolvers }
