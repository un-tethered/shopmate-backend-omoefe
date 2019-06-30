import { queryById, queryAll } from './helpers/resolverGenerators'

const attributeQueries = {
  attributes: queryAll('attributes'),
  attribute: queryById('Attribute')
}

export { attributeQueries as default }
