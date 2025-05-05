import React, { useState } from "react";

import ScribeLayout from "../Layouts/ScribeLayout";
import ScribeContainer from "../components/Editor/ScribeContainer";

const Scribe: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <ScribeLayout>
        <ScribeContainer />
      </ScribeLayout>
    </div>
  );
};

export default Scribe;
