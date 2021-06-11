import { body } from 'express-validator';

const userSchema = [
    body('forename')
        .exists({checkFalsy: true})
        .isLength({ min: 2 })
        .withMessage('Ime mora imati najmanje 2 slova')
        .isString()
        .withMessage('Ime mora biti tekstualnog formata'),
    body('surname')
        .exists({checkFalsy: true})
        .isLength({ min: 2 })
        .withMessage('Prezime mora imati najmanje 2 slova')
        .isString()
        .withMessage('Prezime mora biti tekstualnog formata'),
    body('email')
        .exists({checkFalsy: true})
        .isEmail()
        .withMessage('Email mora biti u validnom formatu'),
    body('password')
        .exists({checkFalsy: true})
        .isLength({ min: 5 })
        .withMessage('Lozinka mora imati najmanje 5 karaktera'),
    body('role')
        .exists({checkFalsy: true})
        .withMessage('Uloga mora postojati')
        .matches(/^student|professor$/)
        .withMessage('Uloga mora biti jedna od sledecih: student , professor'),
    body('isActive')
        .matches(/^1|0$/)
        .withMessage('Aktivnost mora biti jedna od sledecih brojeva: 1 za aktivnog korisnika , 0 za neaktivnog korisnika')
]

export { userSchema }