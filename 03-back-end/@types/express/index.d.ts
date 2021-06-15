import { Request } from 'express';
import TokenData from '../../src/models/tokenData.model';

declare global {
    namespace Express {
        interface Request{
            authorized?: TokenData | null
        }
    }
}