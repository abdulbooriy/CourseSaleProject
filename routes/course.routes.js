import { Router } from "express";
import { create, getAll, getBySearch, getOne, remove, update } from "../controllers/course.controller.js";
import { upload } from "../middleware/multer.js";

const courseRouter = Router()

courseRouter.get("/", getBySearch)
courseRouter.get("/", getAll)
courseRouter.get("/:id", getOne)
courseRouter.post("/", upload.single("image"), create)
courseRouter.patch("/:id", update)
courseRouter.delete("/:id", remove)

export default courseRouter
