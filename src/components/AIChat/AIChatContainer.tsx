import React, { useCallback, useEffect, useRef, useState } from "react";
import Messages from "./Messages";
import { useAppDispatch } from "../../hooks/hooks";
import { chatWithDocumentAsync } from "../../store/thunks/chatThunk";
import { resetState } from "../../store/reducers/chatSlice";
import {
  CircleArrowLeft,
  CircleArrowRight,
  Paperclip,
  X,
  Mic,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import imageCompression from "browser-image-compression";

const AIChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<
    { role: string; text: string; file?: File; fileUrl?: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | undefined>();
  const [fileUrl, setFileUrl] = useState<string | undefined>();
  const [prompt, setPrompt] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recording, setRecording] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileUrl]);

  const handleSubmit = () => {
    if (!prompt && !file) return;

    const userMessage = {
      role: "user",
      text: prompt,
      file: file,
      fileUrl: fileUrl,
    };

    const newMessagesHistory = [...messages, userMessage];
    setMessages(newMessagesHistory);
    setLoading(true);

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

  const handleReset = () => {
    dispatch(resetState());
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }
    setFile(undefined);
    setFileUrl(undefined);
    setPrompt("");
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     const selectedFile = e.target.files[0];
  //     setFile(selectedFile);
  //     if (fileUrl) {
  //       URL.revokeObjectURL(fileUrl);
  //     }
  //     setFileUrl(URL.createObjectURL(selectedFile));
  //     e.target.value = "";
  //   }
  // };
  const _setFileAndUrl = useCallback(
    (newFile: File | undefined) => {
      setFile(newFile);
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
      if (newFile) {
        setFileUrl(URL.createObjectURL(newFile));
      } else {
        setFileUrl(undefined);
      }
    },
    [fileUrl]
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const originalFile = e.target.files[0];

      if (originalFile.type.startsWith("image/")) {
        console.log(
          "originalFile instanceof Blob",
          originalFile instanceof Blob
        );
        console.log(`originalFile size ${originalFile.size / 1024 / 1024} MB`);

        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };

        try {
          const compressedFile = await imageCompression(originalFile, options);
          console.log(
            `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
          );

          const newFile = new File([compressedFile], originalFile.name, {
            type: compressedFile.type,
          });

          _setFileAndUrl(newFile);
        } catch (error) {
          console.error("Image compression failed:", error);

          _setFileAndUrl(originalFile);
        }
      } else {
        _setFileAndUrl(originalFile);
      }
      e.target.value = "";
    }
  };

  const toggleRecording = async () => {
    if (recording) {
      mediaRecorderRef.current?.stop();
      setRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks: Blob[] = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunks.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
          const audioFile = new File([audioBlob], "recording.webm", {
            type: "audio/webm",
          });
          setFile(audioFile);
          if (fileUrl) {
            URL.revokeObjectURL(fileUrl);
          }
          setFileUrl(URL.createObjectURL(audioFile));
        };

        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();
        setRecording(true);
      } catch (err) {
        console.error("Audio recording error:", err);
        alert("Аудио жаздырууга уруксат бериңиз.");
      }
    }
  };
  // Функция для установки файла и его URL
  const setAndCreateFileUrl = useCallback(
    (newFile: File) => {
      setFile(newFile);
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
      setFileUrl(URL.createObjectURL(newFile));
    },
    [fileUrl]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      const items = e.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.startsWith("image/")) {
            const blob = items[i].getAsFile();
            if (blob) {
              const pastedFile = new File(
                [blob],
                `pasted_image_${Date.now()}.${blob.type.split("/")[1]}`,
                { type: blob.type }
              );
              setAndCreateFileUrl(pastedFile);
              e.preventDefault();
              break;
            }
          }
        }
      }
    },
    [setAndCreateFileUrl]
  );
  return (
    <div className="h-screen flex flex-col">
      <div className="px-4 flex flex-col md:flex-row items-center md:mt-0">
        <div className="self-start md:self-center">
          <NavLink to="/" className="border-gray-600 text-gray-600 p-2">
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
            <div className="flex flex-col gap-2 px-4 py-2 text-sm text-gray-700 max-w-[170px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Paperclip className="w-4 h-4 text-gray-500" />
                  <span className="truncate max-w-xs">{file.name}</span>
                </div>
                <button
                  onClick={() => {
                    setFile(undefined);
                    if (fileUrl) {
                      URL.revokeObjectURL(fileUrl);
                    }
                    setFileUrl(undefined);
                  }}
                  title="Remove file"
                >
                  <X className="w-4 h-4 text-gray-500 hover:text-red-500 transition" />
                </button>
              </div>

              {file.type.startsWith("image/") && fileUrl && (
                <img
                  src={fileUrl}
                  alt={file.name}
                  className="rounded-lg border max-h-64 object-contain"
                />
              )}
              {file.type.startsWith("audio/") && fileUrl && (
                <audio controls className="max-w-xs mt-2" src={fileUrl} />
              )}
            </div>
          )}
          <div className="w-full border border-neutral-300 rounded-2xl bg-white px-4 pt-4 pb-2">
            <input
              type="text"
              placeholder="Жазыңыз..."
              value={prompt}
              disabled={loading}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              onPaste={handlePaste}
              className="w-full text-xl text-gray-800 bg-white rounded-2xl border-none focus:outline-none focus:ring-0 focus:border-none"
            />
            <div className="flex items-center justify-between mt-3 px-1">
              <div className="flex gap-3">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    disabled={loading}
                    accept=".docx,.pdf,.webm,.png,.jpg,.gif,.jpeg,.svg,audio/*"
                    className="hidden"
                  />
                  <Paperclip className="size-6 text-gray-600 hover:text-black transition" />
                </label>
                <button
                  type="button"
                  title={recording ? "Токтотуу" : "Жаздырууну баштоо"}
                  onClick={toggleRecording}
                  disabled={loading}
                >
                  <Mic
                    className={`size-6 transition ${
                      recording
                        ? "text-red-600 animate-pulse"
                        : "text-gray-600 hover:text-black"
                    }`}
                  />
                </button>
              </div>
              <button onClick={handleSubmit} disabled={loading}>
                <CircleArrowRight
                  className={`size-7 text-gray-600 transition hover:text-black ${
                    loading ? "opacity-50 pointer-events-none" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatContainer;
