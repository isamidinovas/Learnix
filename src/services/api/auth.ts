import { LoginData, RegisterData, UserInfo } from "../../types/auth";

export async function registerUser(data: RegisterData): Promise<void> {
  const response = await fetch("http://localhost:8000/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Ката кетти");
  }
}

export async function loginUser(data: LoginData): Promise<void> {
  const response = await fetch("http://localhost:8000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Ката кетти");
  }

  // распарсим JSON и сохраним токен
  const payload = await response.json();
  const token = payload.access_token;
  if (!token) throw new Error("Login succeeded but no token in response");

  localStorage.setItem("access_token", token);
}

export async function logoutUser(): Promise<void> {
  localStorage.removeItem("access_token");
  try {
    await fetch("http://localhost:8000/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  } catch (error) {
    console.error("Logout failed", error);
  }

  window.location.href = "/";
}
export async function getUser(): Promise<UserInfo> {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No auth token");

  const response = await fetch("http://localhost:8000/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) throw new Error("Unauthorized");
    throw new Error("Failed to fetch profile");
  }

  return await response.json();
}
