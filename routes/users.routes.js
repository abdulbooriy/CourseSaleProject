import { Router } from "express";
import { login, refreshToken, register, verifyOtp } from "../controllers/users.controller.js";
import upload from "../middleware/multer.js";
import verifyToken from "../middleware/verifyToken.js";

const userRoute = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Foydalanuvchilar bilan bog'liq API'lar
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: "Foydalanuvchi ro'yxatdan o'tishi"
 *     tags: [Users]
 *     description: "Yangi foydalanuvchi ro‘yxatdan o‘tadi va email orqali OTP oladi"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ali"
 *               surname:
 *                 type: string
 *                 example: "Valiyev"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "ali@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "Ali@1234"
 *               role:
 *                 type: string
 *                 enum: ["admin", "student", "teacher"]
 *                 example: "student"
 *               experience:
 *                 type: integer
 *                 example: 3
 *               year:
 *                 type: integer
 *                 example: 2024
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: "Foydalanuvchi ro‘yxatdan o‘tdi"
 *       400:
 *         description: "Xato so‘rov"
 */
userRoute.post("/register", upload.single("image"), register);

/**
 * @swagger
 * /users/verify-otp:
 *   post:
 *     summary: "Email orqali OTP kodni tasdiqlash"
 *     tags: [Users]
 *     description: "Foydalanuvchi emailga kelgan OTP kodni tasdiqlaydi va akkauntini faollashtiradi"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "ali@example.com"
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: "Akkaunt muvaffaqiyatli faollashtirildi"
 *       400:
 *         description: "Xato so‘rov"
 *       403:
 *         description: "Noto‘g‘ri OTP kod"
 */
userRoute.post("/verify-otp", verifyOtp);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: "Foydalanuvchi tizimga kirishi"
 *     tags: [Users]
 *     description: "Email va parol orqali tizimga kirish"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "ali@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "Ali@1234"
 *     responses:
 *       200:
 *         description: "Muvaffaqiyatli tizimga kirdi"
 *       401:
 *         description: "Akkaunt faollashtirilmagan"
 *       403:
 *         description: "Email yoki parol noto‘g‘ri"
 */
userRoute.post("/login", login);

/**
 * @swagger
 * /users/refresh-token:
 *   get:
 *     summary: "Yangi access token olish"
 *     tags: [Users]
 *     description: "Foydalanuvchi refresh token orqali yangi access token oladi"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: "Yangi access token yaratildi"
 *       401:
 *         description: "Notog‘ri yoki muddati o‘tgan token"
 */
userRoute.get("/refresh-token", verifyToken, refreshToken);

export default userRoute;
