import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client'
import { API_URL, WS_URL } from './urls'
import { onError } from '@apollo/client/link/error'
import excludedRoutes from './excluded-routes'
import { onLogout } from '../utils/logout'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'

interface OriginalError {
    statusCode?: number
    message: string
}

const logoutLink = onError((error) => {

    if (error.graphQLErrors?.length) {

        const graphQLError = error.graphQLErrors[0]

        const originalError = graphQLError.extensions?.originalError as OriginalError

        const statusCode = originalError?.statusCode

        if (statusCode === 401) {

            if (!excludedRoutes.includes(window.location.pathname)) {

                onLogout()

            }

        }

    }

    if (error.networkError) {

        console.error("Network error:", error.networkError)

    }

})

const httpLink = new HttpLink({ uri: `${API_URL}/graphql` })

const wsLink = new GraphQLWsLink(createClient({

    url: `ws://${WS_URL}/graphql`

}))

const splitLink = split(
    ({ query }) => {

        const definition = getMainDefinition(query)

        return (definition.kind === "OperationDefinition" && definition.operation === "subscription")

    },
    wsLink,
    httpLink
)

const client = new ApolloClient({

    cache: new InMemoryCache({

        typePolicies: {

            Query: {

                fields: {

                    chats: {

                        keyArgs: false,
                        merge

                    },

                    messages: {

                        keyArgs: ["chatId"],

                        merge

                    }

                }

            }

        }

    }),

    link: logoutLink.concat(splitLink),

    defaultOptions: {

        watchQuery: {

            fetchPolicy: 'cache-and-network'

        }

    }

})

function merge(existing: any, incoming: any, { args }: any) {

    const merged = existing ? existing.slice(0) : []

    for (let i = 0; i < incoming.length; ++i) {

        merged[args.skip + i] = incoming[i]

    }

    return merged

}

export default client