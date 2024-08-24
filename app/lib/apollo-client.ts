// graphql/apollo-client.ts
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { HttpLink } from '@apollo/client/link/http'

import { GRAPHQL_URL } from '../utils/constants'

import { getCurrentUserToken } from './auth'

const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
})

// const authLink = setContext((_, { headers }) => {
//   const token = '' // Retrieve token from storage if you have authentication
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   }
// })

const authorizationLink = setContext(() => {
  return getCurrentUserToken().then((token) => {
    if (
      !token
      // !getIsPublicRoute(window.location.pathname) &&
    ) {
      console.error('Auth token is not available')
    }
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
    }
  })
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authorizationLink.concat(httpLink),
})

export default client
