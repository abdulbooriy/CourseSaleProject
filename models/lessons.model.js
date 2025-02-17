import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Course from "./course.model.js";

const Lessons = sequelize.define(
  "Lessons",
  {
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
      type: DataTypes.INTEGER,
      references: {
        model: Course,
        key: "id",
      },
      allowNull: false,
    },
  },
  { timestamps: false }
);

Lessons.hasMany(Course, { foreignKey: "CourseID" });
Course.belongsTo(Lessons, { foreignKey: "CourseID" });

export default Lessons;
