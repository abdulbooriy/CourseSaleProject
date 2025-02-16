import { Router } from "express";
import { create, getAll, getBySearch, getOne, remove, update } from "../controllers/courseCategory.controller.js";

const courseCategoryRouter = Router()

courseCategoryRouter.get("/", getBySearch)
courseCategoryRouter.get("/", getAll)
courseCategoryRouter.get("/:id", getOne)
courseCategoryRouter.post("/", create)
courseCategoryRouter.patch("/:id", update)
courseCategoryRouter.delete("/:id", remove)

export default courseCategoryRouter
