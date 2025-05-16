import React from "react";
import Layout from "../Layouts/Layout";

import DeckCreateContainer from "../components/DecksPage/DeckCreateContainer";

const DeckCreate: React.FC = () => {
  return (
    <Layout>
      <DeckCreateContainer />
    </Layout>
  );
};

export default DeckCreate;
