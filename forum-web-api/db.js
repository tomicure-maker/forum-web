import { Sequelize} from "sequelize";
import path from "path";

console.log("Base de datos utilizada:", path.resolve("./forum.db"));

export const sequelize = new Sequelize
({
  dialect: "sqlite",
  storage: "./forum.db"
});