import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 p-4">{children}</main>
    <Footer />
  </div>
);
export default Layout;
