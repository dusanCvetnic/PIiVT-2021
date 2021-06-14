import { Router } from "express";
import { userSchema } from "../schemas/user.schema"
import { validateRequest } from '../middlewares/validateRequest';
import { createUser, deleteUserById, getAllUsers, getUserById, loginUser, registerUser, updateUserById } from "../controllers/user.controller";

const router = Router()

router.route('/')
    .get(getAllUsers)
    .post(userSchema, validateRequest, createUser)
router.route('/:id')
    .get(getUserById)
    .put(userSchema, validateRequest, updateUserById)
    .delete(deleteUserById)
router.route('/login')
    .post(loginUser)
router.route('/register')
    .post(registerUser)

export default router;  