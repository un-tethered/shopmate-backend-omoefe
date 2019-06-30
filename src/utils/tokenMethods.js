import { verify, sign } from 'jsonwebtoken'

const secret = process.env.JWT_SECRET

export const getUserFromToken = ({ headers: { authorization: tokenString } }) => {
  try {
    if (!tokenString) {
      return null
    }

    const token = tokenString.split(' ').pop()

    const user = verify(token, secret)

    return user
  } catch (error) {
    return null
  }
}

export const signToken = payload => sign(payload, secret, { expiresIn: '7 days' })
