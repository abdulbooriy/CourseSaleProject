import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Lessons = sequelize.define("Lessons", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    videoLink: { 
        type: DataTypes.STRING,
        allowNull: false,
    },

    CourseID: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },

}, {timestamps: false});

export default Lessons;