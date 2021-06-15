import { body } from 'express-validator';

interface UserLogin {
    email: string;
    password: string;
}

const userLoginSchema = [
    body('email')
        .exists({checkFalsy: true})
        .isEmail()
        .withMessage('Email mora biti u validnom formatu'),
    body('password')
        .exists({checkFalsy: true})
        .isLength({ min: 5 })
        .withMessage('Lozinka mora imati najmanje 5 karaktera')
]

export { UserLogin }
export { userLoginSchema }
