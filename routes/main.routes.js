import { Router } from "express";
import courseRouter from "./course.routes.js";
import courseCategoryRouter from "./courseCategory.routes.js";

const mainRouter = Router()

mainRouter.use("/courses", courseRouter)
mainRouter.use("/coursecategories", courseCategoryRouter)

export default mainRouter
