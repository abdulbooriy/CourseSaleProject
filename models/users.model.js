import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Users = sequelize.define("Users", {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    role: {
        type: DataTypes.ENUM('admin', 'teacher', 'student', 'user'),
        allowNull: false,
        defaultValue: 'user',
    },

    experience: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    year: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    avatar: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'inactive',
        allowNull: false,
    }
});


export default Users;