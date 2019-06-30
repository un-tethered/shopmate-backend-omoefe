import { queryAll, queryById } from './helpers/resolverGenerators'

const departmentQueries = {
  departments: queryAll('departments'),
  department: queryById('Department')
}

export { departmentQueries as default }
