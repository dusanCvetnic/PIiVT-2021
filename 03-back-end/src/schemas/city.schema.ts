import { body } from 'express-validator';

const citySchema = [
  body('name')
    .exists({checkFalsy: true})
    .isString()
    .isLength({ min: 2 })
    .withMessage('Grad Mora imati najmanje 2 slova')
]

export { citySchema }