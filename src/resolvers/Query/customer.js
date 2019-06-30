import { queryById } from './helpers/resolverGenerators'

const customerQueries = {
  profile: queryById('Customer')
}

export { customerQueries as default }
