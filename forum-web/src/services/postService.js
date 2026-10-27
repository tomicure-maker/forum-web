import { apiRequest } from "./api.js";

function mapPost(post) {
    return {
        id: post.id,
        title: post.titulo,
        content: post.contenido,
        author: post.autor?.nombreUsuario || "Usuario",
        date: post.fecha_creacion,
        tags: (post.etiquetas || []).map((tag) => ({ tagName: tag.nombre, color: "secondary" })),
    };
}

export async function getPosts() {
    const posts = await apiRequest("/posts");
    return posts.map(mapPost);
}

export async function getPost(id) {
    return mapPost(await apiRequest(`/posts/${id}`));
}

export async function createPost({ title, content, tags }) {
    const post = await apiRequest("/posts", {
        method: "POST",
        body: JSON.stringify({ titulo: title, contenido: content, tags }),
    });
    return mapPost(post);
}

export async function deletePost(id) {
    return apiRequest(`/posts/${id}`, { method: "DELETE" });
}
