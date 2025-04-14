import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { ReactNode, useState } from "react";
import TextBooksNav from "../components/TextBooksPage/TextBooksNav";

interface LayoutProps {
  children: ReactNode;
}

const TextBooksLayout: React.FC<LayoutProps> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onMenuClick={() => setMenuOpen(true)} />
      <TextBooksNav />
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 p-4 bg-gray-50 overflow-auto">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default TextBooksLayout;
