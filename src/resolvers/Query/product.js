import { queryById } from './helpers/resolverGenerators'
import { getProductOpArgs, productConnectionFields } from './helpers/product'

const productQueries = {
  async products(parent, args, { prisma }) {
    const opArgs = getProductOpArgs(args)

    const { first, ...countArgs } = opArgs

    const { length: count } = await prisma.query.products(countArgs)

    const {
      pageInfo: {
        hasNextPage: hasNext,
        startCursor,
        endCursor
      },
      edges
    } = await prisma.query.productsConnection(opArgs, productConnectionFields)

    const products = edges.map(({ node }) => {
      const { attributes, reviews } = node
      const attributesFormatted = attributes.reduce((acc, { attribute: { name }, value }) => ({
        ...acc,
        [name.toLowerCase()]: [...acc[name.toLowerCase()], value]
      }), {
        color: [],
        size: []
      })

      let rating = null

      if (reviews.length) {
        rating = reviews.reduce((acc, current, i) => {
          const newCount = acc.count + 1
          if (i === reviews.length - 1) {
            return {
              value: (acc.total + current.rating) / newCount,
              count: newCount
            }
          }

          return {
            total: acc.total + current.rating,
            count
          }
        }, {
          total: 0,
          count: 0
        })
      }

      return {
        ...node,
        attributes: attributesFormatted,
        rating
      }
    })

    return {
      hasNext,
      startCursor,
      endCursor,
      products,
      count
    }
  },

  product: queryById('Product')
}

export { productQueries as default }
