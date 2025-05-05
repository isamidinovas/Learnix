import { LoginData, RegisterData } from "../../types/auth";

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
}

export async function getUser(user_id: string): Promise<void> {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("No auth token");
  const response = await fetch(`http://localhost:8000/profile/${user_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized");
    }
    throw new Error("Failed to fetch profile");
  }

  return await response.json();
}
