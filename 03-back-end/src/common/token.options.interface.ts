import { Algorithm } from "jsonwebtoken";

interface TokenKeyOptions{
    private: string,
    public: string,
    duration: number
}

interface TokenOptions {
    auth: TokenKeyOptions,
    refresh: TokenKeyOptions,
    issuer: string,
    algorithm: Algorithm
}

export default interface TokenConfig {
    auth: {
        student: TokenOptions,
        professor: TokenOptions
    }
}