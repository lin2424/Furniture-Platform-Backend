import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { ProfileCategories } from "../entity/ProfileCategories";
import { validate } from "class-validator";
import { Err, ErrStr, HttpCode } from "../helper/Err";
// CRUD


export class ProfileCategoriesController{

    public static get repo(){
        return getRepository(ProfileCategories);
    }


    static async all(request: Request, response: Response, next: NextFunction) {
        let profileCategories = [];

        try {
            profileCategories = await ProfileCategoriesController.repo.find();
        } catch(e) {
            console.log('error, write to DB', e);
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e))
        }

        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, profileCategories));
    }

    static async one(request: Request, response: Response, next: NextFunction) {
        const {categoryId} = request.params;
        if (!categoryId) return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrMissingParameter))

        let profileCategory = null;

        try {
            profileCategory = await ProfileCategoriesController.repo.findOneOrFail(profileCategory);
        } catch(e) {
            console.log('error, write to DB', e);
            return response.status(404).send(new Err(HttpCode.E404, ErrStr.ErrStore, e))
        }

        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, profileCategory));
    }


    // static async create(request: Request, response: Response, next: NextFunction) {
        
    //     const { profileCategories } = request.body;

    //     for (let ele of profileCategories) {
    //         const { profileCategories } = ele;
    //         for (let p of profileCategories) {
    //             const { name, price, disabled, checked } = p;
    //             let profileCategory = new ProfileCategories();

    //             profileCategory.name = name;
    //             profileCategory.displayMode= Number(price);

    //             try {
    //                 const errors = await validate(profileCategory);
    //                 if(errors.length > 0) {
    //                     let err = new Err(HttpCode.E400, ErrStr.ErrMissingParameter)
    //                     return response.status(400).send(err)
    //                 }

    //                 //save data to DB
    //                 await ProfileCategoriesController.repo.save(profileCategory)
    //             } catch(e) {
    //                 console.log('error, write to DB', e);
    //                 return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e))
    //             }
    //         }
    //     }

    //     return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK));

    // }

    static async delete(request: Request, response: Response, next: NextFunction) {
        
    }

    static async update(request: Request, response: Response, next: NextFunction) {
    }
}