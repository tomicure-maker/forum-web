import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Comentario = sequelize.define(
  "Comentario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    contenido: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    comentarioPadreId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "comentarios",
    timestamps: false,
  }
);