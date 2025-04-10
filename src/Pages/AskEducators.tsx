import React from "react";
import Layout from "../Layouts/Layout";
import AskEducators from "../components/AskEducators/AskEducatorsContainer";

const Home: React.FC = () => {
  return (
    <Layout>
      <AskEducators />
    </Layout>
  );
};

export default Home;
