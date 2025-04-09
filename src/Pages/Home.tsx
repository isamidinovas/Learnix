import CTASection from "../components/Home/CTASection";
import FeaturesSection from "../components/Home/Features";
import Hero from "../components/Home/Hero";
import Testimonials from "../components/Home/Testimonials";
import Layout from "../Layouts/Layout";

const Home: React.FC = () => {
  return (
    <Layout>
      <div>
        <Hero />
        <FeaturesSection />
        <Testimonials />
        <CTASection />
      </div>
    </Layout>
  );
};

export default Home;
