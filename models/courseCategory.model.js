import sequelize from "../config/database.js";
import {DataTypes} from "sequelize"

const CourseCategory = sequelize.define("coursecategory", 
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.STRING,
            allowNull: true,  
        },
    }
)

export default CourseCategory
