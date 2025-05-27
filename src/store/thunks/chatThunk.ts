import { createAsyncThunk } from "@reduxjs/toolkit";

const API_ENDPOINT = "http://127.0.0.1:8000/chat-with-document/";
export const chatWithDocumentAsync = createAsyncThunk(
  "chatWithDocument/chat",
  async (
    data: { file?: File; messages: { role: string; text: string }[] },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();

      if (data.file) {
        formData.append("file", data.file);
      }

      formData.append("messages", JSON.stringify(data.messages));

      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        let errorMessage = "An error occurred";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {}
        return rejectWithValue(errorMessage);
      }

      const responseData = await response.json();
      return responseData.response;
    } catch (error: any) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);
