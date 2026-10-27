import { User } from "./User.js";
import Post from "./Post.js";
import { Comentario } from "./Comentario.js";
import { Etiqueta } from "./Etiqueta.js";

// Un usuario puede crear muchas publicaciones y comentarios.
User.hasMany(Post, { foreignKey: "usuarioId", as: "publicaciones" });
Post.belongsTo(User, { foreignKey: "usuarioId", as: "autor" });

Post.hasMany(Comentario, { foreignKey: "postId", as: "comentarios" });
Comentario.belongsTo(Post, { foreignKey: "postId", as: "publicacion" });
User.hasMany(Comentario, { foreignKey: "usuarioId", as: "comentarios" });
Comentario.belongsTo(User, { foreignKey: "usuarioId", as: "autor" });

Post.belongsToMany(Etiqueta, { through: "post_etiquetas", foreignKey: "postId", otherKey: "etiquetaId", as: "etiquetas" });
Etiqueta.belongsToMany(Post, { through: "post_etiquetas", foreignKey: "etiquetaId", otherKey: "postId", as: "publicaciones" });

// Respuestas anidadas: un comentario puede tener respuestas.
Comentario.hasMany(Comentario, { foreignKey: "comentarioPadreId", as: "respuestas" });
Comentario.belongsTo(Comentario, { foreignKey: "comentarioPadreId", as: "comentarioPadre" });
