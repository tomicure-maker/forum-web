import Post from "../models/Post.js";
import { User } from "../models/User.js";
import { Etiqueta } from "../models/Etiqueta.js";

const include = [
  { model: User, as: "autor", attributes: ["id", "nombreUsuario", "rol"] },
  { model: Etiqueta, as: "etiquetas", through: { attributes: [] } },
];

export async function listPosts() {
  return Post.findAll({ include, order: [["id", "DESC"]] });
}

export async function getPost(id) {
  return Post.findByPk(id, { include });
}

export async function createPost({ titulo, contenido, tags = [] }, userId) {
  
  if (!titulo?.trim() || !contenido?.trim()) {
    const error = new Error("El título y el contenido son obligatorios.");
    error.status = 400;
    throw error;
  }

  const post = await Post.create({ titulo: titulo.trim(), contenido: contenido.trim(), usuarioId: userId });
  if (Array.isArray(tags) && tags.length) {
    const cleanTags = [...new Set(tags.map((tag) => typeof tag === "string" ? tag : tag?.tagName).filter((tag) => typeof tag === "string" && tag.trim()).map((tag) => tag.trim()))];
    const tagRows = [];
    for (const nombre of cleanTags) {
      const [tag] = await Etiqueta.findOrCreate({ where: { nombre } });
      tagRows.push(tag);
    }
    await post.setEtiquetas(tagRows);
  }
  return getPost(post.id);
}

export async function deletePost(id, user) {
  const post = await Post.findByPk(id, {
    include: [
      {
        model: User,
        as: "autor",
        attributes: ["id", "rol"],
      },
    ],
  });

  if (!post) {
    const error = new Error("No se encontro la publicacion");
    error.status = 404;
    throw error;

  }

  const esAutor = post.usuarioId === user.id;

  const esAdminAutorizado =
  user.rol === "admin" && post.autor?.rol === "usuario";

  const esSuperAdminAutorizado =
   user.rol === "superadmin" &&
   ["usuario", "admin"].includes(post.autor?.rol);

  
  if (!esAutor && !esAdminAutorizado && !esSuperAdminAutorizado) {
    const error = new Error(
      "No tenes permisos para eliminar esta publicacion"
    );
    error.status = 403;
    throw error;
  }

  await post.destroy();
  
}
