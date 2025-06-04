export async function fetchWithRefresh(
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> {
  const fetchAttempt = async () => {
    return fetch(input, {
      ...init,
      credentials: "include", // чтобы куки всегда шли
    });
  };

  let response = await fetchAttempt();

  if (response.status === 401) {
    // Пытаемся обновить access токен
    const refreshResponse = await fetch("http://localhost:8000/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (!refreshResponse.ok) {
      throw new Error("Unauthorized"); // или возвращай специальный объект ошибки
    }

    // Повторяем запрос после успешного рефреша
    response = await fetchAttempt();
  }

  return response;
}
