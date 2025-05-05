import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Mic, Share2, Menu } from "lucide-react";
import RichTextEditor from "./RichTextEditor";
import ScribeSideBar from "./ScribeSideBar";

interface Note {
  id: string;
  title: string;
  date: Date;
}

const ScribeContainer: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [noteName, setNoteName] = useState("New Note 1");
  const [editorContent, setEditorContent] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Жаңы жазуу 1",
      date: new Date(),
    },
    {
      id: "2",
      title: "Жаңы жазуу 1",
      date: new Date(),
    },
  ]);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: `Жаңы жазуу ${notes.length + 1}`,
      date: new Date(),
    };
    setNotes([newNote, ...notes]);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 right-4 p-2 rounded-lg  lg:hidden z-50"
      >
        <Menu className="w-6 h-6 text-gray-600" />
      </button>

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 w-64 bg-white z-40 transform transition-transform duration-300 ease-in-out
        lg:relative lg:transform-none lg:z-0
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }
      `}
      >
        <ScribeSideBar
          notes={notes}
          onCreateNote={createNewNote}
          onDeleteNote={deleteNote}
        />
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 min-h-screen lg:ml-0">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Note Header */}
          <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
              {/* Recording Controls */}
              <div className="bg-green-50 rounded-lg flex flex-col lg:flex-row items-start lg:items-center w-full lg:w-auto">
                <button
                  onClick={toggleRecording}
                  className="flex items-center justify-center px-4 py-2 rounded-lg text-white bg-green-500 hover:bg-green-600 transition-colors w-full lg:w-auto"
                >
                  <Mic className="w-5 h-5 mr-2" />
                  Жазууну баштоо
                </button>
                <span className="px-4 py-2 lg:py-0 text-gray-600 text-sm w-full lg:w-auto text-center lg:text-left">
                  Жазуу жок...
                </span>
              </div>

              {/* Note Name Input */}
              <div className="flex-1 w-full lg:max-w-sm">
                <input
                  type="text"
                  value={noteName}
                  onChange={(e) => setNoteName(e.target.value)}
                  placeholder="Жазуунун аталышы"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 justify-end">
              <button className="p-2 lg:px-4 lg:py-2 text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 whitespace-nowrap text-sm lg:text-base">
                Флешкарталарды түзүү
              </button>
            </div>
          </div>

          {/* Editor */}
          <RichTextEditor value={editorContent} onChange={setEditorContent} />
        </div>
      </div>
    </div>
  );
};

export default ScribeContainer;
