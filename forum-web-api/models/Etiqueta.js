import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Etiqueta = sequelize.define(
    "etiqueta",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    { timestamps: false },
);
