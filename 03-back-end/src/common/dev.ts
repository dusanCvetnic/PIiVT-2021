import TokenConfig from './token.options.interface';
import { readFileSync } from 'fs';

const Config: TokenConfig  = {
    auth: {
        student: {
            algorithm: "RS256",
            issuer: "localhost",
            auth: {
                duration: 60 * 60 * 24 * 7,
                public: readFileSync('keystore/student-auth.public', 'utf-8'),
                private: readFileSync('keystore/student-auth.private', 'utf-8')
            },
            refresh: {
                duration: 60 * 60 * 24 * 365,
                public: readFileSync('keystore/student-refresh.public', 'utf-8'),
                private: readFileSync('keystore/student-refresh.private', 'utf-8')
            }
        },
        professor: {
            algorithm: "RS256",
            issuer: "localhost",
            auth: {
                duration: 60 * 60 * 24 * 7,
                public: readFileSync('keystore/professor-auth.public', 'utf-8'),
                private: readFileSync('keystore/professor-auth.private', 'utf-8')
            },
            refresh: {
                duration: 60 * 60 * 24 * 365,
                public: readFileSync('keystore/professor-refresh.public', 'utf-8'),
                private: readFileSync('keystore/professor-refresh.private', 'utf-8')
            }
        }
    }
}

export default Config