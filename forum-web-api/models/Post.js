import {DataTypes} from "sequelize";
import { sequelize } from "../db.js";

export const Post = sequelize.define("post", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { timestamps: false });

export default Post;