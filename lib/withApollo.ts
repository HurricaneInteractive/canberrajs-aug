import withApollo from "next-with-apollo"
import ApolloClient, { InMemoryCache } from "apollo-boost"

export default withApollo(({ ctx, headers, initialState }) => (
  new ApolloClient({
    uri: "http://data.resauce.space/graphql",
    cache: new InMemoryCache().restore(initialState || {})
  })
))
