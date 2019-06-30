import { queryById } from './helpers/resolverGenerators'

const orderQueries = {
  order: queryById('Order')
}

export { orderQueries as default }
