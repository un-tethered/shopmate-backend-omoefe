import verify from '../../utils/checkAuthStatus'
import { checkIfCartExists } from './helpers/cart'

const orderMutations = {
  async createOrder(parent, { data }, { prisma, user }, info) {
    verify(user)

    const { id: userId } = user
    const { cartId, shippingId, taxId } = data

    await checkIfCartExists(prisma, { id: cartId, userId })

    return prisma.mutation.createOrder({
      data: {
        cart: {
          connect: {
            id: cartId
          }
        },
        customer: {
          connect: {
            id: userId
          }
        },
        shippingDetails: {
          connect: {
            id: shippingId
          }
        },
        tax: {
          connect: {
            id: taxId
          }
        }
      }
    }, info)
  }
}

export { orderMutations as default }
