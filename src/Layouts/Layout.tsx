import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { ReactNode, useState } from "react";
import SideMenu from "../components/Sidebar/SideBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className=" mt-16 min-h-screen flex flex-col">
      <Navbar onMenuClick={() => setMenuOpen(true)} />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-shrink-0">
          <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        </div>
        <main className="flex-1  bg-gray-50 overflow-auto">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
