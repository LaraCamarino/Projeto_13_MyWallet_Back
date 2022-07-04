import { Router } from "express";
import { signUp, signIn } from "../controllers/authController.js";
import validateSignUp from "../middlewares/validateSignUp.js";
import validateSignIn from "../middlewares/validateSignIn.js";

const router = Router();

router.post("/sign-up", validateSignUp, signUp);
router.post("/sign-in", validateSignIn, signIn);

export default router;