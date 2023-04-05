import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api-ca-central-1.hygraph.com/v2/clg1dpl1r89y501ue0ava00ft/master",
  cache: new InMemoryCache(),
});

export default client;
