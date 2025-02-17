import { Router } from "express";

import courseCategoryRouter from "./courseCategory.routes.js";
import LessonsRoute from "./lessons.routes.js";
import CommentsRoute from "./comments.routes.js";
import courseRouter from "./course.routes.js";
import userRoute from "./users.routes.js";

const mainRoute = Router();

mainRoute.use('/course-categories', courseCategoryRouter);
mainRoute.use('/comments', CommentsRoute);
mainRoute.use('/lessons', LessonsRoute);
mainRoute.use('/course', courseRouter);
mainRoute.use('/users', userRoute);


export default mainRoute;