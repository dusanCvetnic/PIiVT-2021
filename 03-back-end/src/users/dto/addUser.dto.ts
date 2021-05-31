import Ajv from "ajv"

interface AddUserDto{
    forename: string
    surname: string
    email: string
    passwordHash: string
    role: 'student' | 'professor'
}

const ajv = new Ajv()

const addUserDtoValidator = ajv.compile({
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
        }
    },
    required: [
        "forename",
        "surname",
        "email",
        "passwordHash",
        "role"
    ],
    additionalProperties: false
})

export {AddUserDto}
export {addUserDtoValidator}