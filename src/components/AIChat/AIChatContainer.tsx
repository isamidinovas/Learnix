import React, { useState } from "react";
import Messages from "./Messages";
import { useAppDispatch } from "../../hooks/hooks";
import { chatWithDocumentAsync } from "../../store/thunks/chatThunk";
import { resetState } from "../../store/reducers/chatSlice";
import { CircleArrowLeft, CircleArrowRight, Paperclip, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const AIChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<
    { role: string; text: string; file?: File }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | undefined>();
  const [prompt, setPrompt] = useState("");
  const dispatch = useAppDispatch();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      e.target.value = "";
    }
  };
  const handleSubmit = () => {
    if (!prompt && !file) return;

    const userMessage = {
      role: "user",
      text: prompt,
      file: file,
    };

    // Формируем новую историю: все старые сообщения + новое сообщение
    const newMessagesHistory = [...messages, userMessage];

    setMessages(newMessagesHistory);
    setLoading(true);

    // Передаем всю историю на бекенд
    dispatch(chatWithDocumentAsync({ file, messages: newMessagesHistory }))
      .then((action) => {
        const geminiMessage = {
          role: "gemini",
          text: action.payload as string,
        };
        setMessages((prev) => [...prev, geminiMessage]);
        setLoading(false);
      })
      .catch((action) => {
        const errorMessage = {
          role: "gemini",
          text: `Error: ${action.payload as string}`,
        };
        setMessages((prev) => [...prev, errorMessage]);
        setLoading(false);
      });

    handleReset();
  };

  // const handleSubmit = () => {
  //   if (!prompt && !file) return;

  //   const userMessage = {
  //     role: "user",
  //     text: prompt,
  //     fileName: file?.name,
  //   };

  //   setMessages((prevMessages) => [...prevMessages, userMessage]);
  //   setLoading(true);

  //   dispatch(chatWithDocumentAsync({ file, prompt }))
  //     .then((action) => {
  //       const geminiMessage = {
  //         role: "gemini",
  //         text: action.payload as string,
  //       };
  //       setMessages((prevMessages) => [...prevMessages, geminiMessage]);
  //       setLoading(false);
  //     })
  //     .catch((action) => {
  //       const errorMessage = {
  //         role: "gemini",
  //         text: `Error: ${action.payload as string}`,
  //       };
  //       setMessages((prevMessages) => [...prevMessages, errorMessage]);
  //       setLoading(false);
  //     });

  //   handleReset();
  // };

  const handleReset = () => {
    dispatch(resetState());
    setFile(undefined);
    setPrompt("");
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="px-4  flex flex-col md:flex-row items-center  md:mt-0">
        <div className="self-start md:self-center">
          <NavLink to="/" className=" border-gray-600 text-gray-600 p-2  ">
            <CircleArrowLeft className="w-12 h-7 md:h-9" />
          </NavLink>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-3 md:gap-4 w-full">
          <span className="bg-blue-100 rounded-full text-3xl md:text-4xl">
            🤖
          </span>
          <h1 className="text-lg md:text-2xl font-semibold text-gray-800">
            Жасалма интеллект мугалимибизден каалаган нерсе жөнүндө сураңыз!
          </h1>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-4">
        <Messages messages={messages} loading={loading} />
      </div>

      <div className="px-4 py-4 border-t bg-white">
        <div className="relative w-full max-w-4xl mx-auto p-4 space-y-2">
          {file && (
            <div className="flex flex-col gap-2 px-4 py-2  text-sm text-gray-700 max-w-[170px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Paperclip className="w-4 h-4 text-gray-500" />
                  <span className="truncate max-w-xs">{file.name}</span>
                </div>
                <button onClick={() => setFile(undefined)} title="Remove file">
                  <X className="w-4 h-4 text-gray-500 hover:text-red-500 transition" />
                </button>
              </div>

              {file.type.startsWith("image/") && (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="rounded-lg border max-h-64 object-contain"
                />
              )}
            </div>
          )}

          <div className="relative">
            <input
              type="text"
              placeholder="Жазыңыз..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full pl-14 pr-12 py-6 text-xl text-gray-800 bg-white rounded-2xl border border-neutral-300 focus:border-gray-500 focus:outline-none transition"
            />

            <label className="absolute left-4 bottom-5 cursor-pointer">
              <input
                type="file"
                onChange={handleFileChange}
                accept=".docx,.pdf,.png,.jpg,.gif,.jpeg,.svg"
                className="hidden"
              />
              <Paperclip className="size-6 text-gray-600 hover:text-black transition" />
            </label>

            <CircleArrowRight
              className="absolute right-4 bottom-5 size-7 text-gray-600 hover:text-black transition cursor-pointer"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatContainer;
