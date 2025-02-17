import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Comments = sequelize.define(
  "Comments",
  {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    star: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    CourseID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    UsersID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);

export default Comments;
