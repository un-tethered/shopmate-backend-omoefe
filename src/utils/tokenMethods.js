import { verify, sign } from 'jsonwebtoken'

export const getUserFromToken = ({ headers: { authorization: tokenString } }) => {
  try {
    if (!tokenString) {
      return null
    }

    const token = tokenString.split(' ').pop()

    const user = verify(token, 'dragon')

    return user
  } catch (error) {
    return null
  }
}

export const signToken = payload => sign(payload, 'dragon', { expiresIn: '7 days' })
