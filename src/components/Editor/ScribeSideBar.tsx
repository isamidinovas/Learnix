import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";

interface Note {
  id: string;
  title: string;
  date: Date;
}

interface ScribeSideBarProps {
  notes: Note[];
  onCreateNote: () => void;
  onDeleteNote: (id: string) => void;
}

const ScribeSideBar: React.FC<ScribeSideBarProps> = ({
  notes,
  onCreateNote,
  onDeleteNote,
}) => {
  return (
    <div className="h-full bg-white border-r border-gray-100 w-full">
      <div className="flex flex-col h-full">
        {/* Go Back Link */}
        <Link
          to="/"
          className="flex items-center gap-2 p-4 text-blue-600 hover:text-blue-700 lg:mt-0 mt-12"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Артка кайтуу</span>
        </Link>

        {/* Logo and Description */}
        <div className="px-4 mb-6">
          <h1 className="text-2xl font-bold text-blue-600">Scribe</h1>
          <p className="text-sm text-gray-600 mt-1">
            Лекцияларыңызды жазып, транскрипциялаңыз жана жазууларды реалдуу
            убакытта түзүңүз.
          </p>
        </div>

        {/* Create Note Button */}
        <div className="px-4">
          <button
            onClick={onCreateNote}
            className="w-full bg-blue-600 text-white rounded-lg py-2.5 font-medium hover:bg-blue-700 transition-colors"
          >
            Жаңы жазуу түзүү
          </button>
        </div>

        {/* YouTube Input */}
        <div className="px-4 mt-4">
          <p className="text-sm text-gray-600 mb-2">
            Же YouTube шилтемесин киргизиңиз
          </p>
          <div className="flex">
            <input
              type="text"
              placeholder="www.youtube.com/"
              className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-l-lg focus:outline-none focus:border-blue-500"
            />
            <button className="px-3 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700">
              →
            </button>
          </div>
        </div>

        {/* Notes List */}
        <div className="px-4 mt-8 flex-1 overflow-y-auto">
          <h2 className="text-sm font-medium text-gray-900 mb-3">
            Сиздин лекция жазууларыңыз
          </h2>
          <div className="space-y-1">
            {notes.map((note) => (
              <div
                key={note.id}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer group"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 truncate">
                    {format(note.date, "MMM dd, yyyy")}
                  </p>
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {note.title}
                  </p>
                </div>
                <button
                  onClick={() => onDeleteNote(note.id)}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 ml-2"
                >
                  <span className="sr-only">Өчүрүү</span>×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScribeSideBar;
