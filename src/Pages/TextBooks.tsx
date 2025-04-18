import React from "react";
import TextBooksLayout from "../Layouts/TextBooksLayout";
import Solutions from "../components/TextBooksPage/Solutions";
import FindTextbookSolutions from "../components/TextBooksPage/FindTextbookSolutions";

const TextBooks: React.FC = () => {
  return (
    <TextBooksLayout>
      <Solutions />
      <FindTextbookSolutions />
    </TextBooksLayout>
  );
};

export default TextBooks;
