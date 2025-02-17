import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Users from "../models/users.model.js";
import Course from "../models/course.model.js";

const Comments = sequelize.define(
  "Comments",
  {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    star: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    createdAt: {
      type: DataTypes.DATE,
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

    UsersID: {
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: "id",
      },
      allowNull: false,
    },
  },
  { timestamps: false }
);

Comments.hasMany(Course, { foreignKey: "CourseID" });
Course.belongsTo(Comments, { foreignKey: "CourseID" });

Comments.hasMany(Users, { foreignKey: "UsersID" });
Users.belongsTo(Comments, { foreignKey: "UsersID" });

export default Comments;
