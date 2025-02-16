import express from "express"
import sequelize from "./config/database.js";
import dotenv from "dotenv"
import mainRouter from "./routes/main.routes.js";

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use("/api", mainRouter)
app.use("/uploads", express.static("uploads"))


async function bootstrap(){
    try {
        await sequelize.sync()
        console.log("Connected to database successfully");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        })
    } catch (error) {
        console.log(error.message);
    }
}

bootstrap()
