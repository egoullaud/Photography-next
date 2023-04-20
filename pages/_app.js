import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";

import client from "../apolloClient";

export default function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />;
    </ApolloProvider>
  );
}
