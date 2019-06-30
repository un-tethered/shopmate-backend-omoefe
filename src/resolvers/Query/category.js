import { queryById, queryAll } from './helpers/resolverGenerators'

const categoryQueries = {
  categories: queryAll('categories'),
  category: queryById('Category')
}

export { categoryQueries as default }
