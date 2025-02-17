import { Router } from "express";
import { create, getAll, getBySearch, getOne, remove, update } from "../controllers/course.controller.js";
import  upload  from "../middleware/multer.js";

const courseRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Kurslarga oid API'lar
 */

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: "Kurslarni qidirish yoki hammasini olish"
 *     tags: [Courses]
 *     description: "Qidiruv parametrlari orqali yoki barcha kurslarni olish"
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: "Kurs nomi bo‘yicha qidirish"
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *         required: false
 *         description: "Kurs toifasi bo‘yicha qidirish"
 *     responses:
 *       200:
 *         description: "Kurslar ro‘yxati"
 */
courseRouter.get("/", getBySearch);

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: "Bitta kursni olish"
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: "Kurs ID'si"
 *     responses:
 *       200:
 *         description: "Bitta kurs ma’lumoti"
 *       404:
 *         description: "Kurs topilmadi"
 */
courseRouter.get("/:id", getOne);

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: "Yangi kurs qo‘shish"
 *     tags: [Courses]
 *     description: "Foydalanuvchilar yangi kurs qo‘shishi mumkin"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "JavaScript Dasturlash"
 *               description:
 *                 type: string
 *                 example: "JavaScript bo‘yicha boshlang‘ich kurs"
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *               userId:
 *                 type: integer
 *                 example: 2
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: "Kurs muvaffaqiyatli yaratildi"
 *       400:
 *         description: "Xato so‘rov"
 */
courseRouter.post("/", upload.single("image"), create);

/**
 * @swagger
 * /courses/{id}:
 *   patch:
 *     summary: "Kursni yangilash"
 *     tags: [Courses]
 *     description: "Mavjud kurs ma’lumotlarini o‘zgartirish"
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: "Kurs ID'si"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated JavaScript Course"
 *               description:
 *                 type: string
 *                 example: "Updated course description"
 *     responses:
 *       200:
 *         description: "Kurs muvaffaqiyatli yangilandi"
 *       404:
 *         description: "Kurs topilmadi"
 */
courseRouter.patch("/:id", update);

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: "Kursni o‘chirish"
 *     tags: [Courses]
 *     description: "Mavjud kursni o‘chirish"
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: "Kurs ID'si"
 *     responses:
 *       200:
 *         description: "Kurs muvaffaqiyatli o‘chirildi"
 *       404:
 *         description: "Kurs topilmadi"
 */
courseRouter.delete("/:id", remove);

export default courseRouter;
