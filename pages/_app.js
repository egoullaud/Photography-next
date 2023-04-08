import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import "../styles/globals.css";
import client from "../apolloClient";
import { gql } from "@apollo/client";

export default function MyApp({ Component, pageProps, categoriesData }) {
  return (
    <>
      <NavBar categories={categoriesData?.categories} />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
MyApp.getInitialProps = async () => {
  const { data } = await client.query({
    query: gql`
      query Categories {
        categories(orderBy: listOrder_ASC) {
          title
          id
          slug
        }
      }
    `,
  });

  return { categoriesData: data };
};
