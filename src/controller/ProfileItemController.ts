import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { ProfileItem } from "../entity/ProfileItem";
import { validate } from "class-validator";
import { Err, ErrStr, HttpCode } from "../helper/Err";
// CRUD


export class ProfileItemController{

    public static get repo(){
        return getRepository(ProfileItem);
    }


    static async all(request: Request, response: Response, next: NextFunction) {
        let profileItems = [];

        try {
            profileItems = await ProfileItemController.repo.find();
        } catch(e) {
            console.log('error, write to DB', e);
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e))
        }

        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, profileItems));
    }

    static async one(request: Request, response: Response, next: NextFunction) {
        const {profileItemId} = request.params;
        if (!profileItemId) return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrMissingParameter))

        let profileItem = null;

        try {
            profileItem = await ProfileItemController.repo.findOneOrFail(profileItem);
        } catch(e) {
            console.log('error, write to DB', e);
            return response.status(404).send(new Err(HttpCode.E404, ErrStr.ErrStore, e))
        }

        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, profileItem));
    }


    static async create(request: Request, response: Response, next: NextFunction) {
        
        const { data } = request.body;
        const { profileCategories } = data[0];
            console.log(profileCategories)

        for (let ele of profileCategories) {
            const { profileItems } = ele;
            for (let p of profileItems) {
                const { name, price, disabled, checked } = p;
                let profileItem = new ProfileItem();

                profileItem.name = name;
                profileItem.price = Number(price);
                profileItem.disabled = disabled;
                profileItem.checked = checked;

                try {
                    const errors = await validate(profileItem);
                    if(errors.length > 0) {
                        let err = new Err(HttpCode.E400, ErrStr.ErrMissingParameter)
                        return response.status(400).send(err)
                    }

                    //save data to DB
                    await ProfileItemController.repo.save(profileItem)
                } catch(e) {
                    console.log('error, write to DB', e);
                    return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e))
                }
            }
        }

        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK));

    }

    static async delete(request: Request, response: Response, next: NextFunction) {
        
    }

    static async update(request: Request, response: Response, next: NextFunction) {
    }
}