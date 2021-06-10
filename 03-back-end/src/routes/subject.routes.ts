import { Router } from "express";
import { subjectSchema } from "../schemas/subject.schema";
import { validateRequest } from '../middlewares/validateRequest';
import { createSubject, deleteSubjectById, getAllSubjects, getSubjectById, updateSubjectById } from "../controllers/subject.controller";


const router = Router()

router.route('/')
      .get(getAllSubjects)
      .post(subjectSchema, validateRequest, createSubject)

router.route('/:id')
      .get(getSubjectById)
      .put(subjectSchema, validateRequest, updateSubjectById)
      .delete(deleteSubjectById)

export default router;  