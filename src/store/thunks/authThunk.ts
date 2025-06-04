import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginData, RegisterData, UserInfo } from "../../types/auth";
import { showSuccessToast, showErrorToast } from "../../utils/toast";
import { clearCreatorDecks } from "../reducers/deckSlice";
import { fetchWithRefresh } from "./refreshToken";

export const registerUser = createAsyncThunk<
  void,
  RegisterData,
  { rejectValue: string }
>("auth/registerUser", async (data, { rejectWithValue }) => {
  try {
    const response = await fetch("http://localhost:8000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      showErrorToast(error.detail || "Ката кетти");
      return rejectWithValue(error.detail || "Ката кетти");
    }
    showSuccessToast("Каттоо ийгиликтүү аяктады");
  } catch (error: any) {
    showErrorToast(error.message || "Серверге туташуу мүмкүн болбоду");
    return rejectWithValue(error.message || "Серверге туташуу мүмкүн болбоду");
  }
});

export const loginUser = createAsyncThunk<
  // string,
  void,
  LoginData,
  { rejectValue: string }
>("auth/loginUser", async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    if (!response.ok) {
      const error = await response.json();
      showErrorToast(error.detail || "Ката кетти");
      return rejectWithValue(error.detail || "Ката кетти");
    }

    if (!response.ok) {
      const error = await response.json();
      showErrorToast(error.detail || "Ката кетти");
      return rejectWithValue(error.detail || "Ката кетти");
    }
    dispatch(getUser());
    showSuccessToast("Кош келиңиз!");
  } catch (error: any) {
    showErrorToast(error.message || "Серверге туташуу мүмкүн болбоду");
    return rejectWithValue(error.message || "Серверге туташуу мүмкүн болбоду");
  }
});

export const logoutUser = createAsyncThunk<void, void>(
  "auth/logoutUser",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await fetch("http://localhost:8000/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      dispatch(clearCreatorDecks());
      showSuccessToast("Сиз ийгиликтүү чыктыңыз");
    } catch (error: any) {
      showErrorToast(error.message || "Чыгууда ката кетти");
      return rejectWithValue(error.message || "Чыгууда ката кетти");
    }
  }
);

export const getUser = createAsyncThunk<
  UserInfo,
  void,
  { rejectValue: string }
>("auth/getUser", async (_, { rejectWithValue }) => {
  try {
    const response = await fetchWithRefresh("http://localhost:8000/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 401) return rejectWithValue("Unauthorized");
      return rejectWithValue("Failed to fetch profile");
    }
    return await response.json();
  } catch (error: any) {
    return rejectWithValue(error.message || "Серверге туташуу мүмкүн болбоду");
  }
});
