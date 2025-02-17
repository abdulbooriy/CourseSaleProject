import { Router } from "express";
import { create, getAll, getBySearch, getOne, remove, update } from "../controllers/courseCategory.controller.js";

const courseCategoryRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Course Categories
 *   description: Kurs toifalariga oid API'lar
 */

/**
 * @swagger
 * /course-categories:
 *   get:
 *     summary: "Kurs toifalarini qidirish yoki hammasini olish"
 *     tags: [Course Categories]
 *     description: "Qidiruv parametrlari orqali yoki barcha kurs toifalarini olish"
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: "Kurs toifasi nomi bo‘yicha qidirish"
 *     responses:
 *       200:
 *         description: "Kurs toifalari ro‘yxati"
 */
courseCategoryRouter.get("/", getBySearch);

/**
 * @swagger
 * /course-categories/{id}:
 *   get:
 *     summary: "Bitta kurs toifasini olish"
 *     tags: [Course Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: "Kurs toifasi ID'si"
 *     responses:
 *       200:
 *         description: "Bitta kurs toifasi ma’lumoti"
 *       404:
 *         description: "Kurs toifasi topilmadi"
 */
courseCategoryRouter.get("/:id", getOne);

/**
 * @swagger
 * /course-categories:
 *   post:
 *     summary: "Yangi kurs toifasi qo‘shish"
 *     tags: [Course Categories]
 *     description: "Foydalanuvchilar yangi kurs toifasi qo‘shishi mumkin"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Dasturlash"
 *               description:
 *                 type: string
 *                 example: "Dasturlash bo‘yicha kurslar toifasi"
 *     responses:
 *       201:
 *         description: "Kurs toifasi muvaffaqiyatli yaratildi"
 *       400:
 *         description: "Xato so‘rov"
 */
courseCategoryRouter.post("/", create);

/**
 * @swagger
 * /course-categories/{id}:
 *   patch:
 *     summary: "Kurs toifasini yangilash"
 *     tags: [Course Categories]
 *     description: "Mavjud kurs toifasi ma’lumotlarini o‘zgartirish"
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: "Kurs toifasi ID'si"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Yangilangan toifa"
 *               description:
 *                 type: string
 *                 example: "Yangilangan toifa tavsifi"
 *     responses:
 *       200:
 *         description: "Kurs toifasi muvaffaqiyatli yangilandi"
 *       404:
 *         description: "Kurs toifasi topilmadi"
 */
courseCategoryRouter.patch("/:id", update);

/**
 * @swagger
 * /course-categories/{id}:
 *   delete:
 *     summary: "Kurs toifasini o‘chirish"
 *     tags: [Course Categories]
 *     description: "Mavjud kurs toifasini o‘chirish"
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: "Kurs toifasi ID'si"
 *     responses:
 *       200:
 *         description: "Kurs toifasi muvaffaqiyatli o‘chirildi"
 *       404:
 *         description: "Kurs toifasi topilmadi"
 */
courseCategoryRouter.delete("/:id", remove);

export default courseCategoryRouter;
