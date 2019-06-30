import customerMutations from './customer'
import cartMutations from './cart'
import orderMutations from './order'
import reviewMutations from './review'

export default {
  ...customerMutations,
  ...cartMutations,
  ...orderMutations,
  ...reviewMutations
}
