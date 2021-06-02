import Ajv from "ajv"

interface EditUserDto{
    forename: string
    surname: string
    email: string
    passwordHash: string
    role: 'student' | 'professor',
    isActive: boolean
}

const ajv = new Ajv()

const editUserDtoValidator = ajv.compile({
    type: "object",
    properties: {
        forename: {
            type: "string",
            minLength: 2,
            maxLength: 64
        },
        surname: {
            type: "string",
            minLength: 2,
            maxLength: 64
        },
        email: {
            type: "string",
            minLength: 4,
            maxLength: 255
        },
        passwordHash: {
            type: "string",
            minLength: 6,
            maxLength: 255
        },
        role: {
            type: "string"
        },
        isActive: {
            type: "boolean"
        }
    },
    required: [
        "forename",
        "surname",
        "email",
        "passwordHash",
        "role",
        "isActive"
    ],
    additionalProperties: false
})

export {EditUserDto}
export {editUserDtoValidator}