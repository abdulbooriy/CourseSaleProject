import {Sequelize} from "sequelize"
import dotenv from "dotenv"
dotenv.config()

const sequelize = new Sequelize({
    host: "localhost",
    username: "root",
    password: "0803",
    database: "coursesaleproject",
    dialect: "mysql",
    logging: false,
});

export default sequelize;