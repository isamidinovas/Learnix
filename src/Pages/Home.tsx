import React from "react";
import CTASection from "../components/Home/CTASection";
import FeaturesSection from "../components/Home/Features";
import Hero from "../components/Home/Hero";
import Testimonial from "../components/Home/Testimonial";
import Layout from "../Layouts/Layout";
import ApproachSection from "../components/Home/ApproachSection";

const Home: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <Hero />
        <FeaturesSection />
        <Testimonial />
        <ApproachSection />
        <CTASection />
      </div>
    </Layout>
  );
};

export default Home;
