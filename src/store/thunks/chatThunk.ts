import { createAsyncThunk } from "@reduxjs/toolkit";

const API_ENDPOINT = "http://127.0.0.1:8000/chat-with-document/";

export const chatWithDocumentAsync = createAsyncThunk(
  "chatWithDocument/chat",
  async (data: { file?: File; prompt?: string }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      if (data.file) {
        formData.append("file", data.file);
      }
      if (data.prompt) {
        formData.append("prompt", data.prompt);
      }

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
