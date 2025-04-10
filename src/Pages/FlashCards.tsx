import React from "react";
import Layout from "../Layouts/Layout";

import { FlashCardContainer } from "../components/FlashCardsPage/FlashCardContainer";

const FlashCards: React.FC = () => {
  return (
    <Layout>
      <FlashCardContainer />
    </Layout>
  );
};

export default FlashCards;
