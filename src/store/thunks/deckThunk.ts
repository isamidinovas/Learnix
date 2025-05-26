import { createAsyncThunk } from "@reduxjs/toolkit";
import { DeckData, DeckDataList } from "../../types/decks";
import { showSuccessToast, showErrorToast } from "../../utils/toast";

interface FlashcardData {
  id: number;
  question: string;
  answer: string;
}

interface SearchParams {
  title?: string;
}

interface GetDecksParams {
  title?: string;
  subject?: string;
}

export const createDeck = createAsyncThunk<
  DeckDataList,
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
      showErrorToast(errorData.detail || "Колоданы түзүү мүмкүн болбоду");
      return rejectWithValue(
        errorData.detail || "Колоданы түзүү мүмкүн болбоду"
      );
    }

    const data = await response.json();
    showSuccessToast("Колода ийгиликтүү түзүлдү");
    return data;
  } catch (error: any) {
    showErrorToast(error.message || "Серверге туташуу мүмкүн болбоду");
    return rejectWithValue(error.message || "Серверге туташуу мүмкүн болбоду");
  }
});

export const getDecks = createAsyncThunk<
  DeckDataList[],
  GetDecksParams,
  { rejectValue: string }
>("decks/getDecks", async (params = {}, { rejectWithValue }) => {
  try {
    const queryParams = new URLSearchParams();
    if (params.title) queryParams.append("title", params.title);
    if (params.subject && params.subject !== "Баары") {
      queryParams.append("subject", params.subject);
    }

    const response = await fetch(
      `http://127.0.0.1:8000/decks?${queryParams.toString()}`
    );

    if (!response.ok) {
      throw new Error("Колодаларды алууда ката кетти");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue("Колодаларды алууда ката кетти");
  }
});

export const getMyDecksList = createAsyncThunk<
  DeckDataList[],
  { title?: string },
  { rejectValue: string }
>("decks/getMyDecksList", async ({ title }, { rejectWithValue }) => {
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

    const data = await response.json();
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
  string,
  string,
  { rejectValue: string }
>("decks/removeDeck", async (id: string, { dispatch, rejectWithValue }) => {
  try {
    const token = localStorage.getItem("access_token");
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const response = await fetch(`http://127.0.0.1:8000/decks/${id}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      showErrorToast(errorData.detail || "Колоданы өчүрүү мүмкүн болбоду");
      return rejectWithValue(
        errorData.detail || "Колоданы өчүрүү мүмкүн болбоду"
      );
    }

    showSuccessToast("Колода ийгиликтүү өчүрүлдү");

    return id;
  } catch (error: any) {
    showErrorToast(error.message || "Серверге туташуу мүмкүн болбоду");
    return rejectWithValue(error.message || "Серверге туташуу мүмкүн болбоду");
  }
});

export const updateDeck = createAsyncThunk<
  DeckDataList,
  { id: string; data: DeckData },
  { rejectValue: string }
>("decks/updateDeck", async ({ id, data }, { dispatch, rejectWithValue }) => {
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
      showErrorToast(errorData.detail || "Колоданы өзгөртүү мүмкүн болбоду");
      return rejectWithValue(
        errorData.detail || "Колоданы өзгөртүү мүмкүн болбоду"
      );
    }

    const result = await response.json();
    showSuccessToast("Колода ийгиликтүү жаңыртылды");

    return result;
  } catch (error: any) {
    showErrorToast(error.message || "Серверге туташуу мүмкүн болбоду");
    return rejectWithValue(error.message || "Серверге туташуу мүмкүн болбоду");
  }
});
