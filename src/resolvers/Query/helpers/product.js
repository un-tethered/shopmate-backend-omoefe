import capitalize from '../../../utils/capitalize'

export const getProductOpArgs = ({
  query, category, colors, priceRange, sizes, ...args
}) => {
  const opArgs = { ...args }

  if (query || category || colors || priceRange || sizes) {
    let queryVars = []
    if (query) {
      queryVars = [query, query.toLowerCase(), capitalize(query), query.toUpperCase()]
    }

    opArgs.where = {
      ...(query && {
        OR: [{
          description_in: queryVars
        }, {
          name_in: queryVars
        }]
      }),
      ...(category && {
        categories_some: {
          name: capitalize(category)
        }
      }),
      ...(colors && {
        OR: colors.map(color => ({
          attributes_some: {
            attribute: {
              name: 'Color'
            },
            value: capitalize(color)
          }
        }))
      }),
      ...(sizes && {
        OR: sizes.map(size => ({
          attributes_some: {
            attribute: {
              name: 'Size'
            },
            value: size.toUpperCase()
          }
        }))
      }),
      ...(priceRange && {
        AND: [{
          OR: [{
            discountedPrice: 0,
            price_gte: priceRange[0]
          }, {
            discountedPrice_not: 0,
            discountedPrice_gte: priceRange[0]
          }]
        }, {
          OR: [{
            discountedPrice: 0,
            price_lte: priceRange[1]
          }, {
            discountedPrice_not: 0,
            discountedPrice_lte: priceRange[1]
          }]
        }]
      })
    }
  }

  return opArgs
}

export const productConnectionFields = `
  {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        description
        discountedPrice
        image
        attributes {
          attribute {
            name
          }
          value
        }
        name
        price
        reviews {
          rating
        }
        thumbnail
      }
      cursor
    }
  }
`
