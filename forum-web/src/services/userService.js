import { apiRequest } from "./api.js";

export async function getUsers() {
    return apiRequest("/users");

}


export async function updateUserRole(userId, rol) {
    return apiRequest(`/users/${userId}/role`, {
        method: "PATCH",
        body: JSON.stringify({ rol }),
    });
}

export async function deleteUser(userId) {
    return apiRequest(`/users/${userId}`, {
        method: "DELETE",
    });
}