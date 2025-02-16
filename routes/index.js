import { Router } from "express";
import userRoute from "./users.routes.js";

const mainRoute = Router();

mainRoute.use('/users', userRoute);

export default mainRoute;