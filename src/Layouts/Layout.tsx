import { ReactNode, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import SideMenu from "../components/Sidebar/SideBar";
import Footer from "../components/Footer/Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar onMenuClick={() => setMenuOpen(true)} />
      </div>

      <div className="flex flex-1 pt-16 overflow-hidden">
        <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

        <main className="flex-1 bg-gray-50 overflow-y-auto">
          {children}
          <Footer />
        </main>
      </div>
    </div>
  );
};
export default Layout;
