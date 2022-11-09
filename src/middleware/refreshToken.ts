import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserController } from '../controller/UserController';
import { Err, ErrStr, HttpCode } from '../helper/Err';
require('dotenv').config();

interface GetUserInfoRequest extends Request {
    user: string;
}

const refreshToken = async (request: GetUserInfoRequest, response: Response, next: NextFunction) => {
    const cookies = request.cookies;
    if (!cookies?.jwt) return response.status(401).send(new Err(HttpCode.E401, ErrStr.ErrUnauth));
    const refreshToken = cookies.jwt;
    response.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });

    const foundUser = await UserController.repo.findOne({ where: { refreshToken } });
    if (!foundUser) return response.sendStatus(403); //Forbidden 

    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err: jwt.JsonWebTokenError, decoded: jwt.JwtPayload) => {
            if (err) return response.status(403).send(new Err(HttpCode.E403, ErrStr.ErrUnauth));
            const accessToken = jwt.sign(
                { "email": decoded.email },
                "" + process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME }
            );
            const newRefreshToken = jwt.sign(
                { "username": foundUser.email },
                "" + process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME }
            );

            try {
                await UserController.repo.update({email: foundUser.email}, {refreshToken: newRefreshToken});
            } catch(e) {
                return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore))
            }
            response.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });
            return response.json({ accessToken });
        }
    );
}

export default refreshToken;