import { queryAll, queryById } from './helpers/resolverGenerators'

const shippingRegionQueries = {
  shippingRegions: queryAll('shippingRegions'),
  shippingRegion: queryById('ShippingRegion')
}

export { shippingRegionQueries as default }
