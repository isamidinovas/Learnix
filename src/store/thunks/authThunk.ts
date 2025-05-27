import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginData, RegisterData, UserInfo } from "../../types/auth";
import { showSuccessToast, showErrorToast } from "../../utils/toast";
import { clearCreatorDecks } from "../reducers/deckSlice";

// Регистрация пользователя
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

// Логин пользователя
export const loginUser = createAsyncThunk<
  string, // вернем токен
  LoginData,
  { rejectValue: string }
>("auth/loginUser", async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      showErrorToast(error.detail || "Ката кетти");
      return rejectWithValue(error.detail || "Ката кетти");
    }
    const payload = await response.json();
    const token = payload.access_token;
    if (!token)
      return rejectWithValue("Login succeeded but no token in response");
    localStorage.setItem("access_token", token);
    dispatch(getUser());
    showSuccessToast("Кош келиңиз!");
    return token;
  } catch (error: any) {
    showErrorToast(error.message || "Серверге туташуу мүмкүн болбоду");
    return rejectWithValue(error.message || "Серверге туташуу мүмкүн болбоду");
  }
});

// Логаут пользователя
export const logoutUser = createAsyncThunk<void, void>(
  "auth/logoutUser",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("access_token");
      if (token) {
        await fetch("http://localhost:8000/auth/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      localStorage.removeItem("access_token");
      dispatch(clearCreatorDecks());
      showSuccessToast("Сиз ийгиликтүү чыктыңыз");
    } catch (error: any) {
      showErrorToast(error.message || "Чыгууда ката кетти");
      return rejectWithValue(error.message || "Чыгууда ката кетти");
    }
  }
);

// Получение информации о пользователе
export const getUser = createAsyncThunk<
  UserInfo,
  void,
  { rejectValue: string }
>("auth/getUser", async (_, { rejectWithValue }) => {
  const token = localStorage.getItem("access_token");
  if (!token) return rejectWithValue("No auth token");

  try {
    const response = await fetch("http://localhost:8000/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
