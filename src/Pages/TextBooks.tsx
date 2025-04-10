import React from "react";
import TextBooksLayout from "../Layouts/TextBooksLayout";
import Solutions from "../components/TextBooksPage/Solutions";

const TextBooks: React.FC = () => {
  return (
    <TextBooksLayout>
      <Solutions />
    </TextBooksLayout>
  );
};

export default TextBooks;
