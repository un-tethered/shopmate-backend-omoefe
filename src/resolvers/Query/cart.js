import { checkIfCartExists } from '../Mutation/helpers/cart'

const cartQueries = {
  cart: async (parent, { id }, { prisma, user }, info) => {
    const opArgs = { where: { id } }
    await checkIfCartExists(prisma, { id, ownerId: user.id })
    return prisma.query.cart(opArgs, info)
  }
}

export { cartQueries as default }
