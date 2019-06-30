import bcrypt from 'bcryptjs'
import verify from '../../utils/checkAuthStatus'
import hashPasword from '../../utils/hashPassword'
import { signToken } from '../../utils/tokenMethods'

const customerMutations = {
  async signup(parent, { data }, { prisma }) {
    const password = hashPasword(data.password)

    const customer = await prisma.mutation.createCustomer({
      data: {
        ...data,
        password
      }
    })

    const { id, name, email } = customer

    const token = signToken({ id, email, name })
    return { customer, token }
  },

  async login(parent, { data }, { prisma }) {
    const { password: incomingPassword, email } = data

    const customer = await prisma.query.customer({ where: { email } })
    if (!customer) {
      throw new Error('Invalid login credentials.')
    }

    const { id, name, password: dbPassword } = customer

    const isCorrectPassword = bcrypt.compareSync(incomingPassword, dbPassword)
    if (!isCorrectPassword) {
      throw new Error('Invalid login credentials.')
    }

    const token = signToken({ id, email, name })
    return { customer, token }
  },

  updateCustomer(parent, { data }, { prisma, user }, info) {
    verify(user)

    let password

    if (data.password) {
      password = hashPasword(data.password)
    }

    return prisma.mutation.updateCustomer({
      where: {
        id: user.id
      },
      data: {
        ...data,
        ...(password && { password })
      }
    }, info)
  }
}

export default customerMutations
