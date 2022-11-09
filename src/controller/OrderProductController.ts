import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { OrderProduct } from "../entity/OrderProduct";


export class OrderProductController{

    public static get repo(){
        return getRepository(OrderProduct);
    }


    static async all(request: Request, response: Response, next: NextFunction) {
        
    }

    static async one(request: Request, response: Response, next: NextFunction) {
        
    }


    static async create(request: Request, response: Response, next: NextFunction) {
        

    }

    static async delete(request: Request, response: Response, next: NextFunction) {
        
    }

    static async update(request: Request, response: Response, next: NextFunction) {
    }
}