export interface UserModel {
    userId?: number;
    forename: string;
    surname: string;
    email: string;
    password: string;
    role: 'student' | 'professor';
    createdAt?: Date;
    isActive?: 0 | 1;
}