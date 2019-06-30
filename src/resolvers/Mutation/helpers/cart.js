export const checkIfCartExists = async (prisma, { id, ownerId }) => {
  const cartExists = await prisma.exists.Cart({
    id,
    owner: {
      id: ownerId
    }
  })

  if (!cartExists) {
    throw new Error('You have no carts with that ID')
  }
}

export const checkIfCartItemExists = async (prisma, { id, ownerId, cartId }) => {
  const cartExists = await prisma.exists.CartItem({
    id,
    cart: {
      id: cartId,
      owner: {
        id: ownerId
      }
    }
  })

  if (!cartExists) {
    throw new Error('Invalid item ID or cart ID')
  }
}
