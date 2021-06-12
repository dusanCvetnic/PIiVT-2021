import { body } from 'express-validator';

const reviewSchema = [
    body('rating')
        .exists({checkFalsy: true})
        .isNumeric()
        .matches(/^0|1|2|3|4|5$/)
        .withMessage('Ocena mora biti broj od 0 do 5'),
    body('ratedUserId')    
        .exists({checkFalsy: true})
        .isNumeric()
        .withMessage('Review mora sadrzati informacije ko je ocenjen'),
    body('ruserWhoRatedId')    
        .exists({checkFalsy: true})
        .isNumeric()
        .withMessage('Review mora sadrzati informacije ko je ocenio')
]

export { reviewSchema }