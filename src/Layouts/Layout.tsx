import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { ReactNode } from "react";
import SideMenu from "../components/Sidebar/SideBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <div className="flex flex-1 overflow-hidden">
      <div className="flex-shrink-0">
        <SideMenu />
      </div>
      <main className="flex-1 p-4 bg-gray-50 overflow-auto">{children}</main>
    </div>
    <Footer />
  </div>
);

export default Layout;
