import productQueries from './product'
import categoryQueries from './category'
import attributeQueries from './attribute'
import customerQueries from './customer'
import departmentQueries from './department'
import orderQueries from './order'
import shippingRegionQueries from './shippingRegion'
import taxQueries from './tax'
import cartQueries from './cart'

export default {
  ...productQueries,
  ...categoryQueries,
  ...attributeQueries,
  ...customerQueries,
  ...departmentQueries,
  ...orderQueries,
  ...shippingRegionQueries,
  ...taxQueries,
  ...cartQueries
}
