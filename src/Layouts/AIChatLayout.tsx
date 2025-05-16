import { ReactNode } from "react";

interface AIChatLayoutProps {
  children: ReactNode;
}

const AIChatLayout: React.FC<AIChatLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-1 overflow-hidden">
      <main className="flex-1  bg-gray-50 overflow-auto">{children}</main>
    </div>
  );
};

export default AIChatLayout;
