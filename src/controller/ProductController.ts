import {Between, createQueryBuilder, getRepository, LessThan, MoreThan} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { validate } from "class-validator";
import { Err, ErrStr, HttpCode } from "../helper/Err";
import { ProfileItemController } from "./ProfileItemController";
import { ProfileItem } from "../entity/ProfileItem";
import { apiProfileItems } from "../helper/constants";
import { Product } from "../entity/Product";


export class ProductController{

    public static get repo(){
        return getRepository(Product);
    }

    static async all(request: Request, response: Response, next: NextFunction) {
        let products: Product[] = [];
        let profileItems: ProfileItem[] = [];

        try {
            products = await ProductController.repo.find();
            profileItems = await ProfileItemController.repo.find();
        } catch(e) {
            console.log('error, write to DB', e);
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrNoObj, e))
        }
        const productsArray = products.map((_, index) => {
            return {
                "id": products[index].id,
                "slug": products[index].slug,
                "name": products[index].name,
                "price": (products[index].price).toFixed(2).toString(),
                "description": products[index].description,
                "media": products[index].media,
                "colorPalette": products[index].colorPalette,
                "isActive": products[index].isActive,
                "isDelete": products[index].isDelete,
                "createdAt": products[index].createdAt,
                "updatedAt": products[index].updatedAt,
                "categories": [
                    {
                        "id": 1,
                        "slug": "office_chair",
                        "name": "Office Chair"
                    }
                ],
                "profileCategories": apiProfileItems
            }
        })

        const apiData = productsArray;

        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, apiData));
    }

    static async onePage(request: Request, response: Response, next: NextFunction) {
        const { pageNum, limit, priceRange } = request.query;
        const builder = ProductController.repo.createQueryBuilder("Product");
        if (priceRange) {
            const priceRangeArray = (<string>priceRange).split("|");
            for (let i = 0; i < priceRangeArray.length; i++) {
                const range = priceRangeArray[i].split(",");
                builder.orWhere({price: Between(Number(range[0]), Number(range[1]))});
            }
        }
        
        if (!pageNum) return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrMissingParameter))

        let products: Product[] = [];

        try {
            products = await builder.offset(Number(pageNum) * Number(limit)).limit(Number(limit)).getMany();
        } catch(e) {
            console.log('error, write to DB', e);
            return response.status(404).send(new Err(HttpCode.E404, ErrStr.ErrNoObj, e))
        }

        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, products));
    }

    static async one(request: Request, response: Response, next: NextFunction) {
        const {productId} = request.params;
        if (!productId) return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrMissingParameter))

        let product = null;

        try {
            product = await ProductController.repo.findOneOrFail(Number(productId) + 1);
            await product.profileCategories;
        } catch(e) {
            console.log('error, write to DB', e);
            return response.status(404).send(new Err(HttpCode.E404, ErrStr.ErrNoObj, e))
        }

        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, product));
    }


    static async create(request: Request, response: Response, next: NextFunction) {
        let { data } = request.body;

        for (let chair of data) {
            let {name, price, media, slug, description, colorPalette, isActive, isDelete } = chair;
            let product = new Product();
            product.price = Number(price);
            product.name = name;
            product.media = media;
            product.slug = slug;
            product.description = description;
            product.colorPalette = colorPalette;
            product.isActive = isActive;
            product.isDelete = isDelete;

            try {
                const errors = await validate(product);
                if(errors.length > 0) {
                    let err = new Err(HttpCode.E400, ErrStr.ErrMissingParameter)
                    return response.status(400).send(err)
                }

                //save data to DB
                await ProductController.repo.save(product)
            } catch(e) {
                console.log('error, write to DB', e);
                return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e))
            }
        }

        

        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK));

    }

    static async delete(request: Request, response: Response, next: NextFunction) {
        
    }

    static async update(request: Request, response: Response, next: NextFunction) {

    }

}