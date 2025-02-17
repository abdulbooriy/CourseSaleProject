import { Router } from "express";
import { findAll, login, refreshToken, register, verifyOtp, findOne, update, remove } from "../controllers/users.controller.js";
import upload from "../middleware/multer.js";
import verifyToken from "../middleware/verifyToken.js";
import selfPolice from '../middleware/selfPolice.js';
import checkRole from "../middleware/rolePolice.js";

const userRoute = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: "Foydalanuvchilarni ko‘rish"
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: "Foydalanuvchilar ro‘yxati"
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Foydalanuvchilar bilan bog‘liq API'lar
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: "Foydalanuvchini ro‘yxatdan o‘tkazish"
 *     tags: [Users]
 *     description: "Yangi foydalanuvchi yaratish va unga email orqali OTP jo‘natish"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "Ali"
 *               lastName:
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
 *                 enum: ["admin", "teacher", "student", "user"]
 *                 example: "student"
 *               experience:
 *                 type: integer
 *                 example: 3
 *               year:
 *                 type: string
 *                 format: date
 *                 example: "2024-01-01"
 *               avatar:
 *                 type: string
 *                 format: binary  # <-- Shu qism rasm yuklash uchun muhim
 *     responses:
 *       201:
 *         description: "Foydalanuvchi muvaffaqiyatli ro‘yxatdan o‘tkazildi"
 *       400:
 *         description: "Xato so‘rov"
 */

userRoute.post('/register', upload.single('avatar'), register);

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
userRoute.post('/verify-otp', verifyOtp);

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
userRoute.post('/login', login);

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
userRoute.get('/refresh-token', verifyToken, refreshToken);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: "Foydalanuvchilarni ko‘rish"
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: "Foydalanuvchilar ro‘yxati"
 */
userRoute.get('/', verifyToken, checkRole(['admin']), findAll);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: "Bitta foydalanuvchini ko‘rish"
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "Foydalanuvchi ID'si"
 *     responses:
 *       200:
 *         description: "Foydalanuvchi ma’lumotlari"
 *       404:
 *         description: "Foydalanuvchi topilmadi"
 */
userRoute.get('/:id', verifyToken, checkRole(['teacher']), findOne);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: "Foydalanuvchi ma’lumotlarini yangilash"
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "Foydalanuvchi ID'si"
 *     responses:
 *       200:
 *         description: "Foydalanuvchi muvaffaqiyatli yangilandi"
 *       404:
 *         description: "Foydalanuvchi topilmadi"
 */
userRoute.patch('/:id', verifyToken, selfPolice(['admin']), upload.single('avatar'), update);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: "Foydalanuvchini o‘chirish"
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "Foydalanuvchi ID'si"
 *     responses:
 *       200:
 *         description: "Foydalanuvchi muvaffaqiyatli o‘chirildi"
 *       404:
 *         description: "Foydalanuvchi topilmadi"
 */
userRoute.delete('/:id', verifyToken, selfPolice(['admin']), remove);

export default userRoute;