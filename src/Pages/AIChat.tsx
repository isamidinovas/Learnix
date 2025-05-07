import React from "react";
import AIChatContainer from "../components/AIChat/AIChatContainer";
import AIChatLayout from "../Layouts/AIChatLayout";

const AIChat: React.FC = () => {
  return (
    <AIChatLayout>
      <div className="min-h-screen bg-gray-50">
        <AIChatContainer />
      </div>
    </AIChatLayout>
  );
};

export default AIChat;
