import { queryAll, queryById } from './helpers/resolverGenerators'

const taxQueries = {
  taxes: queryAll('taxes'),
  tax: queryById('Tax')
}

export { taxQueries as default }
