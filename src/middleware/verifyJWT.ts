import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
require('dotenv').config();

interface GetUserInfoRequest extends Request {
    user: string;
}

const verifyJWT = (request: GetUserInfoRequest, response: Response, next: NextFunction) => {
    const authHeader = request.headers['authorization'];

    if (!authHeader) return response.sendStatus(401);

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded: jwt.JwtPayload) => {
            if (err) return response.sendStatus(403); //invalid token
            request.user = decoded.email;
            next();
        }
    );
}

export default verifyJWT;