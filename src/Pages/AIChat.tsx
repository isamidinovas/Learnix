import React from "react";
import Layout from "../Layouts/Layout";
import AIChatContainer from "../components/AIChat/AIChatContainer";

const AIChat: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <AIChatContainer />
      </div>
    </Layout>
  );
};

export default AIChat;
