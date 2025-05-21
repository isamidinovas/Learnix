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
  id: number;
  question: string;
  answer: string;
}

export const createDeck = createAsyncThunk<
  any,
  DeckData,
  { rejectValue: string }
>("decks/createDeck", async (deckData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("access_token");
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const response = await fetch(`http://127.0.0.1:8000/create/decks/`, {
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
  { title?: string },
  // void,
  { rejectValue: string }
>("decks/getDecks", async ({ title }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("access_token");

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    const url = new URL("http://127.0.0.1:8000/decks/");
    if (title) {
      url.searchParams.append("title", title);
    }
    const response = await fetch(url.toString(), {
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

export const getMyDecksList = createAsyncThunk<
  DeckDataList[],
  { title?: string },
  { rejectValue: string }
>("decks/getMyDecks", async ({ title }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("access_token");

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    const url = new URL("http://127.0.0.1:8000/my-decks/");
    if (title) {
      url.searchParams.append("title", title);
    }
    const response = await fetch(url.toString(), {
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

export const getDeckById = createAsyncThunk<
  DeckDataList,
  string,
  { rejectValue: string }
>("decks/getDeck", async (id: string, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("access_token");

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const response = await fetch(`http://127.0.0.1:8000/decks/${id}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(
        errorData.detail || "Колодаларды алуу мүмкүн болбоду"
      );
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message || "Серверге туташуу мүмкүн болбоду");
  }
});

export const removeDeck = createAsyncThunk<
  number,
  string,
  { rejectValue: string }
>("decks/removeDeck", async (deck_id: string, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("access_token");

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const response = await fetch(`http://127.0.0.1:8000/decks/${deck_id}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(
        errorData.detail || "Колодаларды алуу мүмкүн болбоду"
      );
    }

    const data = await response.json();
    return data.id; // ← явно число
  } catch (error: any) {
    return rejectWithValue(error.message || "Серверге туташуу мүмкүн болбоду");
  }
});
export const updateDeck = createAsyncThunk<
  DeckDataList,
  { id: string; data: DeckData },
  { rejectValue: string }
>("decks/updateDeck", async ({ id, data }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("access_token");

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const response = await fetch(`http://127.0.0.1:8000/decks/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(
        errorData.detail || "Колоданы өзгөртүү мүмкүн болбоду"
      );
    }

    const result = await response.json();
    return result;
  } catch (error: any) {
    return rejectWithValue(error.message || "Серверге туташуу мүмкүн болбоду");
  }
});
