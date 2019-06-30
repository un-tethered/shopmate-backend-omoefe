import verify from '../../utils/checkAuthStatus'
import { checkIfCartExists, checkIfCartItemExists } from './helpers/cart'

const cartMutations = {
  createCart(parent, args, { prisma, user }, info) {
    verify(user)

    const { id } = user
    return prisma.mutation.createCart({
      data: {
        owner: {
          connect: { id }
        }
      }
    }, info)
  },

  async addItemToCart(parent, { data }, { prisma, user }, info) {
    verify(user)

    const { id: ownerId } = user
    const { cartId: suppliedCartId, productId } = data

    await checkIfCartExists(prisma, { id: suppliedCartId, ownerId })

    const opArgs = {
      data: {
        cart: {
          connect: { id: suppliedCartId }
        },
        product: {
          connect: { id: productId }
        },
        quantity: 1
      }
    }

    const cartItemExists = await prisma.exists.CartItem({
      product: {
        id: productId
      },
      cart: { id: suppliedCartId }
    })

    if (cartItemExists) {
      const [{ id: existingCartId, quantity, product: { price } }] = await prisma.query.cartItems({
        where: {
          product: { id: productId },
          cart: { id: suppliedCartId }
        }
      }, '{ id quantity product { price } }')

      const opArgsForUpdate = {
        ...opArgs,
        where: { id: existingCartId }
      }

      opArgsForUpdate.data.quantity = quantity + 1
      opArgsForUpdate.data.price = price

      await prisma.mutation.updateCartItem(opArgsForUpdate)
    } else {
      const { price: productPrice } = await prisma.query.product({
        where: { id: productId }
      }, '{ price }')

      opArgs.data.price = productPrice

      await prisma.mutation.createCartItem(opArgs)
    }

    return prisma.query.cart({ where: { id: suppliedCartId } }, info)
  },
  async emptyCart(parent, { id }, { prisma, user }, info) {
    verify(user)
    await checkIfCartExists(prisma, { id, ownerId: user.id })

    return prisma.mutation.deleteManyCartItems({
      where: {
        cart: { id }
      }
    }, info)
  },
  async removeCartItem(parent, { data }, { prisma, user }, info) {
    const { itemId, cartId } = data
    verify(user)

    await checkIfCartItemExists(prisma, {
      id: itemId,
      ownerId: user.id,
      cartId
    })

    await prisma.mutation.deleteCartItem({
      where: { id: itemId }
    })

    return prisma.query.cart({ where: { id: cartId } }, info)
  },
  async updateCartItem(parent, { data }, { prisma, user }, info) {
    const { itemId, cartId, quantity } = data
    verify(user)

    await checkIfCartItemExists(prisma, {
      id: itemId,
      ownerId: user.id,
      cartId
    })

    await prisma.mutation.updateCartItem({
      where: { id: itemId },
      data: {
        quantity
      }
    })

    return prisma.query.cart({ where: { id: cartId } }, info)
  }
}

export default cartMutations
