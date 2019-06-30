const generateOwnerOnlyFields = (fields) => {
  const map = {}
  fields.forEach((field) => {
    map[field] = {
      fragment: 'fragment customerId on Customer { id }',
      resolve: (parent, args, { user }) => {
        if (user && user.id === parent.id) {
          return parent[field]
        }
        return null
      }
    }
  })
  return map
}

const Customer = {
  password: () => null,
  ...generateOwnerOnlyFields([
    'address1',
    'address2',
    'email',
    'city',
    'country',
    'creditCard',
    'dayPhone',
    'evePhone',
    'mobPhone',
    'orders',
    'postalCode',
    'region',
    'shippingRegion',
    'carts'
  ])
}

export { Customer as default }
