import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const User = sequelize.define(
    "user",
    {
        id: { 
        type: DataTypes.INTEGER, 
          primaryKey: true, 
          autoIncrement: true 
        },

        nombreUsuario: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        password: { 
          type: DataTypes.STRING, 
          allowNull: false 
        },

        email: { 
          type: DataTypes.STRING, 
          allowNull: false, 
          unique: true 
        },

        esAdmin: { 
          type: DataTypes.BOOLEAN, 
          defaultValue: false 
        },

        rol: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "usuario",
          validate: {
            isIn: [["usuario", "admin", "superadmin"]],
          },
        },
    },
    { timestamps: false },
);
