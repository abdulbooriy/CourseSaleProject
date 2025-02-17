import { Router } from "express";
import { create, findAll, findBySearch, findOne, remove, update } from "../controllers/comments.controller.js";

const CommentsRoute = Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Kommentlarga oid API'lar
 */

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: "Barcha kommentlarni olish"
 *     tags: [Comments]
 *     description: "Barcha kommentlar ro‘yxatini qaytaradi"
 *     responses:
 *       200:
 *         description: "Kommentlar ro‘yxati"
 */
CommentsRoute.get("/", findAll);

/**
 * @swagger
 * /comments/search:
 *   get:
 *     summary: "Kommentlarni qidirish"
 *     tags: [Comments]
 *     description: "Matn bo‘yicha kommentlarni qidiradi"
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
CommentsRoute.get("/search", findBySearch);

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: "Bitta kommentni olish"
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: "Komment ID'si"
 *     responses:
 *       200:
 *         description: "Bitta komment ma’lumoti"
 *       404:
 *         description: "Komment topilmadi"
 */
CommentsRoute.get("/:id", findOne);

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: "Komment qo'shish"
 *     tags: [Comments]
 *     description: "Yangi komment qo‘shadi"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: "This is a great course!"
 *               star:
 *                 type: number
 *                 example: 5
 *               createdAt:
 *                 type: string
 *                 format: date
 *                 example: "2024-02-17T12:00:00Z"
 *               CourseID:
 *                 type: integer
 *                 example: 1
 *               UsersID:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: "Komment yaratildi"
 *       400:
 *         description: "Noto‘g‘ri so‘rov"
 */
CommentsRoute.post("/", create);

/**
 * @swagger
 * /comments/{id}:
 *   patch:
 *     summary: "Kommentni yangilash"
 *     tags: [Comments]
 *     description: "Mavjud kommentni yangilaydi"
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: "Komment ID'si"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: "Updated comment text"
 *               star:
 *                 type: number
 *                 example: 4
 *     responses:
 *       200:
 *         description: "Komment yangilandi"
 *       404:
 *         description: "Komment topilmadi"
 *       400:
 *         description: "Noto‘g‘ri so‘rov"
 */
CommentsRoute.patch("/:id", update);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: "Kommentni o‘chirish"
 *     tags: [Comments]
 *     description: "Mavjud kommentni o‘chiradi"
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: "Komment ID'si"
 *     responses:
 *       200:
 *         description: "Komment o‘chirildi"
 *       404:
 *         description: "Komment topilmadi"
 */
CommentsRoute.delete("/:id", remove);

export default CommentsRoute;
