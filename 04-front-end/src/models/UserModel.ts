export default interface IUser{
    userId: number
    forename: string
    surname: string
    email: string
    password?: string
    role: 'student' | 'professor'
}