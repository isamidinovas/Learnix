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
  Camera,
  Video,
  Image,
  FileText,
  Play,
  StopCircle,
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

  const [showFileInputOptions, setShowFileInputOptions] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileOptionsRef = useRef<HTMLDivElement>(null);
  const videoPreviewRef = useRef<HTMLVideoElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isRecordingVideo, setIsRecordingVideo] = useState(false);
  const videoStreamRef = useRef<MediaStream | null>(null);
  const [cameraFacingMode, setCameraFacingMode] = useState<
    "user" | "environment"
  >("user");

  useEffect(() => {
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileUrl]);

  useEffect(() => {
    if (!isCameraActive && videoStreamRef.current) {
      videoStreamRef.current.getTracks().forEach((track) => track.stop());
      videoStreamRef.current = null;
      if (videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = null;
      }
      setIsRecordingVideo(false);
    } else if (isCameraActive && !videoStreamRef.current) {
      openCameraStream();
    }
  }, [isCameraActive, cameraFacingMode]);

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

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const originalFile = e.target.files[0];

      if (originalFile.type.startsWith("image/")) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        try {
          const compressedFile = await imageCompression(originalFile, options);
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
    setShowFileInputOptions(false);
  };

  const openFileInputWithType = (acceptType: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = acceptType;
      fileInputRef.current.click();
    }
    setShowFileInputOptions(false);
  };

  const openCameraStream = async () => {
    setLoading(true);
    if (videoStreamRef.current) {
      videoStreamRef.current.getTracks().forEach((track) => track.stop());
      videoStreamRef.current = null;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: cameraFacingMode },
        audio: true,
      });
      videoStreamRef.current = stream;

      if (videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = stream;
        videoPreviewRef.current.play();
      }
      setLoading(false);
    } catch (error) {
      console.error("Камерага кирүү мүмкүн эмес:", error);
      alert("Камерага кирүүгө уруксат берүү керек.");
      setLoading(false);
      setIsCameraActive(false);
    }
  };

  const takePhoto = () => {
    if (!videoPreviewRef.current || !videoStreamRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoPreviewRef.current.videoWidth;
    canvas.height = videoPreviewRef.current.videoHeight;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.drawImage(videoPreviewRef.current, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          const photoFile = new File([blob], `photo-${Date.now()}.png`, {
            type: "image/png",
          });
          _setFileAndUrl(photoFile);
        }
        setIsCameraActive(false);
      }, "image/png");
    }
  };

  const toggleVideoRecording = async () => {
    if (!videoStreamRef.current) return;

    if (isRecordingVideo) {
      mediaRecorderRef.current?.stop();
      setIsRecordingVideo(false);
    } else {
      try {
        const mediaRecorder = new MediaRecorder(videoStreamRef.current, {
          mimeType: "video/webm",
        });
        const videoChunks: BlobPart[] = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            videoChunks.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const videoBlob = new Blob(videoChunks, { type: "video/webm" });
          const videoFile = new File([videoBlob], `video-${Date.now()}.webm`, {
            type: "video/webm",
          });
          _setFileAndUrl(videoFile);
          setIsCameraActive(false);
        };

        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();
        setIsRecordingVideo(true);
      } catch (error) {
        console.error("Видео жаздырууну баштоодо ката кетти:", error);
        alert("Видео жаздырууну баштоо мүмкүн эмес.");
      }
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
          _setFileAndUrl(audioFile);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Проверяем, если меню открыто И клик произошел вне контейнера опций файла
      // И клик не был по кнопке Paperclip, которая открывает меню
      if (
        showFileInputOptions &&
        fileOptionsRef.current &&
        !fileOptionsRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest("button[title='Файл кошуу']")
      ) {
        setShowFileInputOptions(false);
      }
    };

    // Добавляем слушатель событий на весь документ
    document.addEventListener("mousedown", handleClickOutside);

    // Очищаем слушатель событий при размонтировании компонента
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFileInputOptions]);

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
              _setFileAndUrl(pastedFile);
              e.preventDefault();
              break;
            }
          }
        }
      }
    },
    [_setFileAndUrl]
  );

  return (
    <div className="h-screen flex flex-col">
      {!isCameraActive && (
        <>
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
                Жасалма интеллект мугалибибизден каалаган нерсе жөнүндө сураңыз!
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
                      onClick={() => _setFileAndUrl(undefined)}
                      title="Файлды алып салуу"
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
                  {file.type.startsWith("video/") && fileUrl && (
                    <video
                      controls
                      src={fileUrl}
                      className="rounded-lg border max-h-64 object-contain"
                    >
                      Your browser does not support the video element.
                    </video>
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
                  <div className="relative flex gap-3">
                    <button
                      type="button"
                      title="Файл кошуу"
                      onClick={() => setShowFileInputOptions((prev) => !prev)}
                      disabled={loading}
                      className="p-2 rounded-full hover:bg-gray-100"
                    >
                      <Paperclip
                        className={`size-6 transition ${
                          loading
                            ? "text-gray-400"
                            : "text-gray-600 hover:text-black"
                        }`}
                      />
                    </button>

                    <button
                      type="button"
                      title={recording ? "Токтотуу" : "Жаздырууну баштоо"}
                      onClick={toggleRecording}
                      disabled={loading}
                      className="p-2 rounded-full hover:bg-gray-100"
                    >
                      <Mic
                        className={`size-6 transition ${
                          recording
                            ? "text-red-600 animate-pulse"
                            : "text-gray-600 hover:text-black"
                        }`}
                      />
                    </button>

                    <button
                      type="button"
                      title="Камераны ачуу"
                      onClick={() => setIsCameraActive(true)}
                      disabled={loading}
                      className="p-2 rounded-full hover:bg-gray-100"
                    >
                      <Camera
                        className={`size-6 transition ${
                          loading
                            ? "text-gray-400"
                            : "text-gray-600 hover:text-black"
                        }`}
                      />
                    </button>

                    {showFileInputOptions && (
                      <div
                        ref={fileOptionsRef}
                        className="absolute bottom-full mb-2 right-0 bg-white shadow-lg rounded-lg py-2 z-10 w-48"
                      >
                        <button
                          type="button"
                          onClick={() => openFileInputWithType("*/*")}
                          disabled={loading}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          <FileText className="size-5" /> Файл тандоо
                        </button>
                      </div>
                    )}
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onClick={() => openFileInputWithType("*/*")}
                    onChange={handleFileInputChange}
                    className="hidden"
                  />

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
        </>
      )}

      {isCameraActive && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-30">
          <video
            ref={videoPreviewRef}
            autoPlay
            playsInline
            muted
            className="w-[50%] h-[50-%] object-cover"
          />

          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
            <button
              onClick={() => setIsCameraActive(false)}
              disabled={loading || isRecordingVideo}
              className="p-2 rounded-full bg-white/30 text-white hover:bg-white/50 transition disabled:opacity-50"
              title="Чатка кайтуу"
            >
              <CircleArrowLeft className="size-7" />
            </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center items-center gap-6 bg-gradient-to-t from-black/50 to-transparent">
            <button
              onClick={takePhoto}
              disabled={loading || isRecordingVideo}
              className="p-4 rounded-full bg-white/80 text-black border-4 border-white hover:bg-white transition disabled:opacity-50"
              title="Сүрөт тартуу"
            >
              <Image className="size-8" />
            </button>

            <button
              onClick={toggleVideoRecording}
              disabled={loading}
              className={`p-4 rounded-full ${
                isRecordingVideo ? "bg-red-600" : "bg-white/80"
              } text-white border-4 ${
                isRecordingVideo ? "border-red-800" : "border-white"
              } hover:${
                isRecordingVideo ? "bg-red-700" : "bg-white"
              } transition disabled:opacity-50 ${
                isRecordingVideo ? "animate-pulse" : ""
              }`}
              title={
                isRecordingVideo
                  ? "Видео жаздырууну токтотуу"
                  : "Видео жаздырууну баштоо"
              }
            >
              {isRecordingVideo ? (
                <StopCircle className="size-8" />
              ) : (
                <Play className="size-8" />
              )}
            </button>
          </div>

          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-lg">
              Камераны ачуу...
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIChatContainer;
