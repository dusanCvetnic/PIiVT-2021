import { body } from 'express-validator';

const offerSchema = [
  body('price')
    .exists({checkFalsy: true})
    .isNumeric()
    .withMessage('Ponuda mora sadrzati cenu'),
body('userId')
    .exists({checkFalsy: true})
    .isInt()
    .withMessage('Mora postojati korisnik koji je napravio ponudu'),
body('cityId')
    .exists({checkFalsy: true})
    .isInt()
    .withMessage('Mora postojati grad za ponudu'),
body('subjectId')
    .exists({checkFalsy: true})
    .isInt()
    .withMessage('Mora postojati predmet za ponudu'),
]

export { offerSchema }