export const queryAll = entity => (
  parent, args, { prisma }, info
) => prisma.query[entity](null, info)

export const queryById = entity => async (parent, { id }, { prisma }, info) => {
  const opArgs = { where: { id } }
  const exists = await prisma.exists[entity]({ id })
  if (!exists) {
    throw new Error(`No ${entity} with that ID`)
  }
  return prisma.query[entity.toLowerCase()](opArgs, info)
}
