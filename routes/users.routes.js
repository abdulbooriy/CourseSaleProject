import { Router } from "express";
import { findAll, login, refreshToken, register, verifyOtp, findOne, update, remove } from "../controllers/users.controller.js";
import upload from "../middleware/multer.js";
import verifyToken from "../middleware/verifyToken.js";
import selfPolice from '../middleware/selfPolice.js';
import checkRole from "../middleware/rolePolice.js";

const userRoute = Router();

userRoute.post('/register', upload.single('avatar'), register);
userRoute.post('/verify-otp', verifyOtp);
userRoute.post('/login', login);
userRoute.get('/refresh-token', verifyToken, refreshToken);
userRoute.get('/', verifyToken, checkRole(['admin']), findAll);
userRoute.get('/:id', verifyToken, checkRole(['teacher']), findOne);
userRoute.patch('/:id', verifyToken, selfPolice(['admin']), upload.single('avatar'), update);
userRoute.delete('/:id', verifyToken, selfPolice(['admin']), remove);

export default userRoute;