import { createAsyncThunk } from "@reduxjs/toolkit";
import { DeckData, DeckDataList } from "../../types/decks";
import { showSuccessToast, showErrorToast } from "../../utils/toast";
import { fetchWithRefresh } from "./refreshToken";

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
    const response = await fetchWithRefresh(
      `http://localhost:8000/create/decks/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deckData),
        credentials: "include",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      showErrorToast(errorData.detail || "Карточка түзүү мүмкүн болбоду");
      return rejectWithValue(
        errorData.detail || "Карточка түзүү мүмкүн болбоду"
      );
    }

    const data = await response.json();
    showSuccessToast("Карточка ийгиликтүү түзүлдү");
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
      `http://localhost:8000/decks?${queryParams.toString()}`
    );

    if (!response.ok) {
      throw new Error("Карточкаларды алууда ката кетти");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue("Карточкаларды алууда ката кетти");
  }
});

export const getMyDecksList = createAsyncThunk<
  DeckDataList[],
  { title?: string; subject?: string },
  { rejectValue: string }
>("decks/getMyDecksList", async ({ title, subject }, { rejectWithValue }) => {
  try {
    const url = new URL("http://localhost:8000/my-decks/");
    if (title) {
      url.searchParams.append("title", title);
    }
    if (subject && subject !== "Баары") {
      url.searchParams.append("subject", subject);
    }
    const response = await fetchWithRefresh(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(
        errorData.detail || "Карточкаларды алуу мүмкүн болбоду"
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
    const response = await fetchWithRefresh(
      `http://localhost:8000/decks/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(
        errorData.detail || "Карточкаларды алуу мүмкүн болбоду"
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
>("decks/removeDeck", async (id: string, { rejectWithValue }) => {
  try {
    const response = await fetchWithRefresh(
      `http://localhost:8000/decks/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      showErrorToast(errorData.detail || "Карточка өчүрүү мүмкүн болбоду");
      return rejectWithValue(
        errorData.detail || "Карточка өчүрүү мүмкүн болбоду"
      );
    }

    showSuccessToast("Карточка ийгиликтүү өчүрүлдү");

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
    const response = await fetchWithRefresh(
      `http://localhost:8000/decks/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      showErrorToast(errorData.detail || "Карточка өзгөртүү мүмкүн болбоду");
      return rejectWithValue(
        errorData.detail || "Карточка өзгөртүү мүмкүн болбоду"
      );
    }

    const result = await response.json();
    showSuccessToast("Карточка ийгиликтүү жаңыртылды");

    return result;
  } catch (error: any) {
    showErrorToast(error.message || "Серверге туташуу мүмкүн болбоду");
    return rejectWithValue(error.message || "Серверге туташуу мүмкүн болбоду");
  }
});
