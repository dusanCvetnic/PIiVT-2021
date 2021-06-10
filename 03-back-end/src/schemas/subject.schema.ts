import { body } from 'express-validator';

const subjectSchema = [
  body('name')
    .exists({checkFalsy: true})
    .isLength({ min: 2 })
    .withMessage('Predmet mora imati najmanje 2 slova')
    .isString()
    .withMessage('Predmet mora biti tekstualnog formata')
]

export { subjectSchema }