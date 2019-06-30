export const checkIfProductExists = async (prisma, { id }) => {
  const productExists = await prisma.exists.Product({ id })

  if (!productExists) {
    throw new Error('No products with that ID')
  }
}
