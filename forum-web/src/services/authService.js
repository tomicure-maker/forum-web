import { apiRequest } from "./api.js";

function saveSession(data) {
    localStorage.setItem("forum_token", data.token);
    localStorage.setItem("forum_user", JSON.stringify(data.user));
    window.dispatchEvent(new Event("forum-auth-changed"));
    return data.user;
}

export async function register({ nombreUsuario, email, password }) {
    return saveSession(await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({ nombreUsuario, email, password }),
    }));
}

export async function login({ identificador, password }) {
    return saveSession(await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ identificador, password }),
    }));
}

export function logout() {
    localStorage.removeItem("forum_token");
    localStorage.removeItem("forum_user");
    window.dispatchEvent(new Event("forum-auth-changed"));
}

export function getCurrentUser() {
    try { return JSON.parse(localStorage.getItem("forum_user")); }
    catch { return null; }
}

export function isAuthenticated() {
    return Boolean(localStorage.getItem("forum_token"));
}
