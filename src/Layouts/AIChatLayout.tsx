import { ReactNode } from "react";
import AIBar from "../components/AIChat/AIBar";

interface AIChatLayoutProps {
  children: ReactNode;
}
interface SuggestedQuestion {
  id: string;
  text: string;
}

const AIChatLayout: React.FC<AIChatLayoutProps> = ({ children }) => {
  const queries: SuggestedQuestion[] = [
    {
      id: "1",
      text: "Эгерде тепкичтин негизи дубалдан 6 метр алыстыкта жайгашкан болсо, дубал боюнча 8 метр бийиктикке жеткен тепкичтин узундугу канча?",
      //   icon: "💡",
    },
    {
      id: "2",
      text: "Пифагордун теоремасы тик бурчтуу үч бурчтукту чечүүгө кандайча жардам берет?",
      //   icon: "💡",
    },
    {
      id: "3",
      text: "Пифагордун теоремасы реалдуу турмушта кандай колдонулат?",
      //   icon: "❓",
    },
  ];

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex-shrink-0">
        <AIBar queries={queries} />
      </div>
      <main className="flex-1  bg-gray-50 overflow-auto">{children}</main>
    </div>
  );
};

export default AIChatLayout;
