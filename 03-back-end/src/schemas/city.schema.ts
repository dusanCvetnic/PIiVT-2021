import { body } from 'express-validator';

const citySchema = [
  body('name')
    .exists({checkFalsy: true})
    .isLength({ min: 2 })
    .withMessage('Grad mora imati najmanje 2 slova')
    .isString()
    .withMessage('Grad mora biti tekstualnog formata')
]

export { citySchema }