import { body } from 'express-validator';

interface RefreshToken {
    refreshToken: string;
}

const refreshTokenSchema = [
    body('refreshToken')
        .exists({checkFalsy: true})
        .isString()
        .withMessage('Email mora biti u validnom formatu')
]

export { RefreshToken }
export { refreshTokenSchema }