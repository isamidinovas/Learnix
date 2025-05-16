import { createAsyncThunk } from "@reduxjs/toolkit";
import { DeckData } from "../../types/decks";

interface DeckDataList {
  title: string;
  description?: string;
  subject: string;
  flashcards: FlashcardData[];
  creator: {
    id: number;
    username: string;
    email: string;
  };
}

interface FlashcardData {
  question: string;
  answer: string;
}

export const createDeck = createAsyncThunk<
  any,
  DeckData,
  { rejectValue: string }
>("decks/createDeck", async (deckData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("authToken");
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const response = await fetch(`http://127.0.0.1:8000/decks/`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(deckData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.detail || "Не удалось создать колоду");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    return rejectWithValue(
      error.message || "Не удалось подключиться к серверу"
    );
  }
});

export const getDecks = createAsyncThunk<
  DeckDataList[],
  void,
  { rejectValue: string }
>("decks/getDecks", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("authToken");

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const response = await fetch("http://127.0.0.1:8000/decks/", {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(
        errorData.detail || "Колодаларды алуу мүмкүн болбоду"
      );
    }

    const data: DeckDataList[] = await response.json();
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message || "Серверге туташуу мүмкүн болбоду");
  }
});
