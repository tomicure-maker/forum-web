import { apiRequest } from "./api.js";

export async function getTags() {
    const tags = await apiRequest("/tags");
    return tags.map((tag) => ({
        tagName: tag.nombre,
        color: tag.color || "secondary",
    }));
}
