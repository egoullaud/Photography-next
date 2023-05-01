import Head from "next/head";
import Layout from "../components/Layout";
import {
  HERO_PAGE_QUERY,
  SERVICES_PAGE_GUERY,
  ABOUT_PAGE_QUERY,
} from "../services/queries";
import client from "../apolloClient";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";

function home({ services, heroes, about }) {
  return (
    <Layout>
      <div>
        <Head>
          <title>Raine Gauthier Photography</title>
          <meta
            name="description"
            content="Raine Gauthier Photography Website"
          />
        </Head>

        <main>
          {/* hero area */}
          <Hero heroes={heroes} />

          {/* services area */}

          <Services services={services} />

          {/* About */}

          <About about={about} />
        </main>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data: servicesData } = await client.query({
    query: SERVICES_PAGE_GUERY,
  });

  const { data: heroData } = await client.query({
    query: HERO_PAGE_QUERY,
  });
  const { data: aboutData } = await client.query({
    query: ABOUT_PAGE_QUERY,
  });
  const heroes = heroData.heroes;
  const services = servicesData.services;
  const about = aboutData.abouts;
  return {
    props: {
      services,
      heroes,
      about,
    },
    revalidate: 86400,
  };
}
export default home;
