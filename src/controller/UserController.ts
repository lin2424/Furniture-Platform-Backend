import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import { validate } from "class-validator";
import { Err, ErrStr, HttpCode } from "../helper/Err";
import { MKController } from "./MKController";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
require('dotenv').config();

export class UserController extends MKController {

    public static get repo(){
        return getRepository(User);
    }


    static async all(request: Request, response: Response, next: NextFunction) {
        let users = [];

        try {
            users = await UserController.repo.find()
        } catch (e) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrNoObj, e))
        }

        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, users))
    }

    static async one(request: Request, response: Response, next: NextFunction) {
        const {userId} = request.params

        if (!userId) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrMissingParameter))
        }

        let user = null
        try {
            user = await UserController.repo.findOneOrFail(userId)
        } catch (e) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrNoObj, e))
        }
        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, user))
    }


    static async login(request: Request, response: Response, next: NextFunction) {
        const { email, password } = request.body;
        if (!email || !password) return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrMissingParameter));

        const foundUser = await UserController.repo.findOne({ where: { email } });
        if (!foundUser) return response.status(401).send(new Err(HttpCode.E401, ErrStr.ErrUnauth)); //Unauthorized 

        // evaluate password 
        const match = await bcrypt.compare(password, foundUser.password);
        if (match) {
            // create JWTs
            const accessToken = jwt.sign(
                { "email": foundUser.email },
                "" + process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME }
            );
            const refreshToken = jwt.sign(
                { "email": foundUser.email },
                "" + process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME }
            );
            const id = foundUser.id
            try {
                await UserController.repo.update({email}, {refreshToken});
            } catch(e) {
                return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore))
            }
            
            // return TOKEN to user
            response.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000 });
            response.json({ accessToken, id });
        } else {
            return response.status(401).send(new Err(HttpCode.E401, ErrStr.ErrUnauth));
        }
    }

    static async register(request: Request, response: Response, next: NextFunction) {
        const { email, password, firstName, lastName } = request.body;

        if (!email || !password) return response.status(400).json({ 'message': 'Username and password are required.' });
        // check for duplicate emails in the db
        
        const duplicate = await UserController.repo.findOne({ where: { email } });
       
        if (duplicate) return response.sendStatus(409); //Conflict 

        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);
        //store the new user
        let user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.password = hashedPwd;

        try {
            const errors = await validate(user);
            if (errors.length > 0) {
                return response.status(HttpCode.E400).send(new Err(HttpCode.E400, ErrStr.ErrNotValid, errors));
            }
            await UserController.repo.save(user);

        } catch (e) {
            return response.status(500).send(new Err(HttpCode.E400, ErrStr.ErrStore, e));
        }

        return response.status(201).json({ 'success': `New user ${email} created!` });
    }

        
    static async changePassword(request: Request, response: Response, next: NextFunction) {
        const { email, password, newPassword } = request.body;

        if (!email || !password) return response.status(400).json({ 'message': 'Username and password are required.' });
        // check if email exists in the db
        try {
            const userFound = await UserController.repo.findOneOrFail({ where: { email } });
            if (userFound) {
                const match = await bcrypt.compare(password, userFound.password);
                if(match) {
                    try {
                        const hashedPwd = await bcrypt.hash(newPassword, 10);
                        await UserController.repo.update({ email }, {password: hashedPwd})
                    } catch(e) {
                        return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e));
                    }
                } else {
                    return response.sendStatus(401); 
                }
            }
        } catch(e) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrNoObj, e));
        }

        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK)) 
    }


    static async delete(request: Request, response: Response, next: NextFunction) {
        const {email} = request.body;

        if (!email) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrMissingParameter))
        }

        let user = null;
        try {
            user = await UserController.repo.findOneOrFail({ where: { email } })
        } catch (e) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrNoObj, e))
        }

        try {
            await UserController.repo.delete(user);
        } catch(e) {
            console.log('error, write to DB', e);
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e));
        }

        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, user)) 
    }
}