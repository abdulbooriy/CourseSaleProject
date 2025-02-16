import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";


dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

// 📌 Swagger konfiguratsiyasi
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "CourseSale API",
    version: "1.0.0",
    description: "CourseSale loyihasi uchun Swagger hujjatlari",
  },
  servers: [
    {
      url: `http://localhost:${PORT}`,
      description: "Local server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], 
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
console.log(`📄 Swagger UI yuklandi: http://localhost:${PORT}/api-docs`);


async function bootstrap() {
  try {
    await sequelize.sync();
    console.log("✅ Connected to database");
    app.listen(PORT, () =>
      console.log(`🚀 Server ${PORT} portda ishlavotti ✌️  | Swagger: http://localhost:${PORT}/api-docs`)
    );
  } catch (error) {
    console.log("❌ Database ulanishda xatolik:", error.message);
  }
}

bootstrap();
