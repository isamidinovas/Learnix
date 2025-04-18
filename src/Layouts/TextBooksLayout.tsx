import Footer from "../components/Footer/Footer";
import { ReactNode } from "react";
import TextBooksNav from "../components/TextBooksPage/TextBooksNav";

interface LayoutProps {
  children: ReactNode;
}

const TextBooksLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <TextBooksNav />
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 bg-gray-50 overflow-auto">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default TextBooksLayout;
