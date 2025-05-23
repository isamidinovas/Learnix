import React from "react";
import CTASection from "../components/Home/CTASection";
import Hero from "../components/Home/Hero";
import Layout from "../Layouts/Layout";
import ApproachSection from "../components/Home/ApproachSection";

const Home: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <Hero />
        <ApproachSection />
        <CTASection />
      </div>
    </Layout>
  );
};

export default Home;
