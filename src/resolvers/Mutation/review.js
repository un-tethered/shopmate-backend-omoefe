import verify from '../../utils/checkAuthStatus'
import { checkIfProductExists } from './helpers/product'

const reviewMutations = {
  async createReview(parent, { data }, { prisma, user }, info) {
    verify(user)

    const { id: userId } = user
    const { productId, rating, review } = data

    await checkIfProductExists(prisma, { id: productId })

    return prisma.mutation.createReview({
      data: {
        product: {
          connect: {
            id: productId
          }
        },
        customer: {
          connect: {
            id: userId
          }
        },
        rating,
        ...(review && { review })
      }
    }, info)
  }
}

export { reviewMutations as default }
