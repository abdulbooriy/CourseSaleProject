import { Router } from "express";
import { login, refreshToken, register, verifyOtp } from "../controllers/users.controller.js";
import upload from "../middleware/multer.js";
import verifyToken from "../middleware/verifyToken.js";

const userRoute = Router();

userRoute.post('/register', upload.single('image'), register);
userRoute.post('/verify-otp', verifyOtp);
userRoute.post('/login', login);
userRoute.get('/refresh-token', verifyToken, refreshToken);

export default userRoute;