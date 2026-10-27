import { Sequelize} from "sequelize";
import path from "path";

console.log("Base de datos utilizada:", path.resolve("./forum.db"));

export const sequelize = new Sequelize
({
  dialect: "sqlite",
  storage: "./forum.db"
});

export async function migrateLegacyPosts() {
  const queryInterface = sequelize.getQueryInterface();
  const tables = await queryInterface.showAllTables();
  if (!tables.includes("posts")) return;

  const columns = await queryInterface.describeTable("posts");
  if (!columns.autor || columns.usuarioId) return;

  await sequelize.query("PRAGMA foreign_keys = OFF");
  try {
    await sequelize.transaction(async (transaction) => {
      await sequelize.query(
        `CREATE TABLE posts_migrating (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          titulo VARCHAR(255) NOT NULL,
          contenido TEXT NOT NULL,
          fecha_creacion DATETIME,
          autorNombre VARCHAR(255),
          usuarioId INTEGER REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE
        )`,
        { transaction },
      );
      await sequelize.query(
        `INSERT INTO posts_migrating (id, titulo, contenido, fecha_creacion, autorNombre, usuarioId)
         SELECT posts.id, posts.titulo, posts.contenido, posts.fecha_creacion, posts.autor,
           (SELECT users.id FROM users WHERE users.nombreUsuario = posts.autor LIMIT 1)
         FROM posts`,
        { transaction },
      );
      await sequelize.query("DROP TABLE posts", { transaction });
      await sequelize.query("ALTER TABLE posts_migrating RENAME TO posts", { transaction });
    });
  } finally {
    await sequelize.query("PRAGMA foreign_keys = ON");
  }
}