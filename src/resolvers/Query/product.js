import { queryById } from './helpers/resolverGenerators'

const productQueries = {
  products(parent, { query, ...args }, { prisma }, info) {
    const opArgs = { ...args }

    if (query) {
      opArgs.where = {
        OR: [{
          description_contains: query
        }, {
          name_contains: query
        }]
      }
    }

    return prisma.query.products(opArgs, info)
  },

  product: queryById('Product')
}

export { productQueries as default }
