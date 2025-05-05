import { ReactNode } from "react";
import ScribeSideBar from "../components/Editor/ScribeSideBar";

interface ScribeLayoutProps {
  children: ReactNode;
}

const ScribeLayout: React.FC<ScribeLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <ScribeSideBar
        notes={[]}
        onCreateNote={() => {}}
        onDeleteNote={() => {}}
      />
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 bg-gray-50 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default ScribeLayout;
