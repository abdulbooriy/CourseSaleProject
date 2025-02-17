import { Router } from "express";
import { create, findAll, findBySearch, findOne, remove, update } from "../controllers/lessons.controller.js";

const LessonsRoute = Router();

/**
 * @swagger
 * tags:
 *   name: Lessons
 *   description: Darslarga oid API'lar
 */

/**
 * @swagger
 * /lessons:
 *   get:
 *     summary: "Barcha darslarni olish"
 *     tags: [Lessons]
 *     description: "Barcha darslar ro‘yxatini qaytaradi"
 *     responses:
 *       200:
 *         description: "Darslar ro‘yxati"
 */
LessonsRoute.get("/", findAll);

/**
 * @swagger
 * /lessons/search:
 *   get:
 *     summary: "Darslarni qidirish"
 *     tags: [Lessons]
 *     description: "Matn bo‘yicha darslarni qidiradi"
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: "Qidiruv so‘zi"
 *     responses:
 *       200:
 *         description: "Qidiruv natijalari"
 */
LessonsRoute.get("/search", findBySearch);

/**
 * @swagger
 * /lessons/{id}:
 *   get:
 *     summary: "Bitta darsni olish"
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: "Dars ID'si"
 *     responses:
 *       200:
 *         description: "Bitta dars ma’lumoti"
 *       404:
 *         description: "Dars topilmadi"
 */
LessonsRoute.get("/:id", findOne);

/**
 * @swagger
 * /lessons:
 *   post:
 *     summary: "Dars qo'shish"
 *     tags: [Lessons]
 *     description: "Yangi dars qo‘shadi"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "JavaScript Introduction"
 *               videoLink:
 *                 type: string
 *                 example: "example"
 *               description:
 *                 type: string
 *                 example: "This is an introduction to JavaScript"
 *               CourseID:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: "Dars yaratildi"
 *       400:
 *         description: "Noto‘g‘ri so‘rov"
 */
LessonsRoute.post("/", create);

/**
 * @swagger
 * /lessons/{id}:
 *   patch:
 *     summary: "Darsni yangilash"
 *     tags: [Lessons]
 *     description: "Mavjud darsni yangilaydi"
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: "Dars ID'si"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated JavaScript Basics"
 *               videoLink:
 *                 type: string
 *                 example: "example"
 *               description:
 *                 type: string
 *                 example: "Updated description for JavaScript basics"
 *     responses:
 *       200:
 *         description: "Dars yangilandi"
 *       404:
 *         description: "Dars topilmadi"
 *       400:
 *         description: "Noto‘g‘ri so‘rov"
 */
LessonsRoute.patch("/:id", update);

/**
 * @swagger
 * /lessons/{id}:
 *   delete:
 *     summary: "Darsni o‘chirish"
 *     tags: [Lessons]
 *     description: "Mavjud darsni o‘chiradi"
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: "Dars ID'si"
 *     responses:
 *       200:
 *         description: "Dars o‘chirildi"
 *       404:
 *         description: "Dars topilmadi"
 */
LessonsRoute.delete("/:id", remove);

export default LessonsRoute;
