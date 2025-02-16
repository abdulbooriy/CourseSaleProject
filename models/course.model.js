import sequelize from "../config/database.js";
import {DataTypes} from "sequelize"
import CourseCategory from "./courseCategory.model.js";
import User from "./users.model.js"

const Course = sequelize.define("course", 
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.STRING,
            allowNull: true,  
        },
        courseCategoryID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: CourseCategory,
                key :"id",
            },
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // userID: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: User,
        //         key: "id"
        //     },
        // },
    }
)

Course.belongsTo(CourseCategory, {foreignKey: "courseCategoryID"});
CourseCategory.hasMany(Course, {foreignKey: "courseCategoryID"});

// Course.belongsTo(User, {foreignKey: "userID"})
// User.hasMany(Course, {foreignKey: "userID"})

export default Course
