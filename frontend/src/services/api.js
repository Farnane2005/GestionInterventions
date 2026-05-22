const BASE_URL = "http://localhost:8081/api";

const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || `Erreur ${res.status}`);
  }

  const text = await res.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
};

export default apiFetch;