import { getAuth } from "firebase/auth";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

// ---------------- AUTH -----------------
export const getFirebaseToken = async () => {
  const auth = getAuth();
  if (!auth.currentUser) {
    throw new Error("User not authenticated");
  }
  const token = await auth.currentUser.getIdToken();
  return token;
};

export const getAuthHeaders = async () => {
  const token = await getFirebaseToken();
  return { Authorization: `Bearer ${token}` };
};

// ---------------- HISTORY -----------------
export const historyAPI = {
  getHistory: async (page, limit) => {
    const res = await fetch(`${API_BASE}/history?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: await getAuthHeaders(),
    });
    return await res.json();
  },

  deleteRecord: async (recordId) => {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/history/${recordId}`, {
      method: "DELETE",
      headers,
    });

    if (!res.ok) throw new Error("Delete failed");

    return res;
  },

  addRecord: async (data) => {
    console.log(data);
    const authHeader = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/history/`, {
      method: "POST",
      headers: {
        ...authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to add record");
    }

    return await res.json();
  },
};

// ---------------- UPLOAD -----------------
export const uploadImage = async (formData) => {
  const authHeader = await getAuthHeaders();
  const response = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    body: formData,
    headers: authHeader,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  const data = await response.json();
  return data;
};
