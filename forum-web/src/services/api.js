const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function apiRequest(path, options = {}) {
    const token = localStorage.getItem("forum_token");
    const headers = { ...(options.body ? { "Content-Type": "application/json" } : {}), ...options.headers };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${API_URL}${path}`, { ...options, headers });
    if (response.status === 204) return null;

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        if (response.status === 401 && token) {
            localStorage.removeItem("forum_token");
            localStorage.removeItem("forum_user");
            window.dispatchEvent(new Event("forum-auth-changed"));
        }
        throw new Error(data.message || "No se pudo completar la solicitud.");
    }
    return data;
}
