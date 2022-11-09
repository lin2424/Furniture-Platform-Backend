import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Order} from "../entity/Order";
import { validate } from "class-validator";
import { Err, ErrStr, HttpCode } from "../helper/Err";
import { IdCheckRes, MKController } from "./MKController";
import { ProductController } from "./ProductController";
import { ProfileItemController } from "./ProfileItemController";
import { OrderProfileitem } from "../entity/OrderProfileItem";
import { OrderProfileItemController } from "./OrderProfileItemController";
import { ProfileItem } from "../entity/ProfileItem";
import { OrderProduct } from "../entity/OrderProduct";
import { OrderProductController } from "./OrderProductController";
import { UserController } from "./UserController";
import { User } from "../entity/User";
import { orderStatusType } from "../entity/OrderStatus";
import { OrderStatusController } from "./OrderStatusController";
import { createClient } from 'redis';
import { PaymentController } from "./PaymentController";
import { Payment } from "../entity/Payment";

export class OrderController extends MKController {

    public static get repo(){
        return getRepository(Order);
    }

    static async validateOrder(user: string, product: number, profileItems: number[]) {
        if (typeof user !== 'string' ||
            typeof product !== 'number' ||
            product <= 0 ||
            !Array.isArray(profileItems)
        ) {
            throw (new Err(HttpCode.E400, 'invalid user id or product id or profileItem ids'));
        }
        
        let res: IdCheckRes[] = [];

        try {
            let temp = await OrderController.checkIdExist([product], ProductController.repo)
            if(temp.index !== -1) {
                throw (new Err(HttpCode.E400, 'Invalid product id,' + temp.index))
            }
            res.push(temp)


            temp = await OrderController.checkIdExist(profileItems, ProfileItemController.repo)
            if(temp.index !== -1) {
                throw (new Err(HttpCode.E400, 'Invalid profileItem id,' + temp.index))
            }
            res.push(temp);

            temp = await OrderController.checkSingleIdExist(user, UserController.repo)
            if(temp.index !== -1) {
                throw (new Err(HttpCode.E400, 'No user record under this email address'))
            }
            res.push(temp);

        } catch(e) {
            console.log('error, write to DB', e);
            throw (new Err(HttpCode.E400, 'Invalid productId or profileItem id,', e))
        }

        // check if there are duplicate profileItems
        let uniqueModules = 0;
        if (profileItems[0] >= 1 && profileItems[0] <= 5) { uniqueModules++ };
        if (profileItems[1] >= 6 && profileItems[0] <= 8) { uniqueModules++ };
        if (profileItems[2] >= 9 && profileItems[0] <= 11) { uniqueModules++ };
        if (profileItems[3] >= 12 && profileItems[0] <= 13) { uniqueModules++ };
        if (profileItems[4] >= 14 && profileItems[0] <= 16) { uniqueModules++ };
        if (profileItems[5] >= 17 && profileItems[0] <= 18) { uniqueModules++ };
        if (profileItems[6] >= 19 && profileItems[0] <= 21) { uniqueModules++ };
        if (uniqueModules < 7) throw (new Err(HttpCode.E400, 'Invalid or duplicate modules ordered!,')) 

        return res;
    }



    static async all(request: Request, response: Response, next: NextFunction) {
        let orders = [];

        try {
            orders = await OrderController.repo.find();
        } catch(e) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrNoObj, e));
        }
        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, orders));
    }

    static async one(request: Request, response: Response, next: NextFunction) {
        const redisClient = createClient();
        const { orderId } = request.params;
        if (!orderId) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrMissingParameter));
        }

        redisClient.get(`PAYMENT_${orderId}`, async(err: any, data: string) => {
            try {
                if (data !== null) {
                    return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, JSON.parse(data)));
                } else {
                    try {
                        let paymentConfirmation: Payment = await PaymentController.repo.findOneOrFail(orderId, {
                            relations: ['order']
                        });
                        redisClient.setex(`PAYMENT_${orderId}`, 3600 , JSON.stringify(paymentConfirmation));
                        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, paymentConfirmation));
                    } catch(e) {
                        return response.status(404).send(new Err(HttpCode.E404, ErrStr.ErrNoObj, e)); 
                    }
                }
            } catch(e) {
                return response.status(404).send(new Err(HttpCode.E404, ErrStr.ErrNoObj, e))
            }
        })
    }


    static async getUserOrders(request: Request, response: Response, next: NextFunction) {
        const redisClient = createClient();

        const {userId} = request.params;
        if (!userId) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrMissingParameter));
        }

        redisClient.get(`USER_${userId}`, async(err: any, data: string) => {
            try {
                if (data !== null) {
                    return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, JSON.parse(data)));
                } else {
                    try {
                        let userFound = await UserController.repo.findOneOrFail(userId, {
                            relations: ['orders', 'orders.orderProduct']
                        });
                        redisClient.setex(`USER_${userId}`, 3600 , JSON.stringify(userFound.orders));
                        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, userFound.orders));
                    } catch(e) {
                        return response.status(404).send(new Err(HttpCode.E404, ErrStr.ErrNoObj, e)); 
                    }
                }
            } catch(e) {
                return response.status(404).send(new Err(HttpCode.E404, ErrStr.ErrNoObj, e))
            }
        })
    }


    static async create(request: Request, response: Response, next: NextFunction) {
        const redisClient = createClient();
        const productEntities = [];
        const profileItemsEntities: ProfileItem[][] = [];
        const profileItemsEntitiesSpread: ProfileItem[] = [];
        const chairPriceArray = [];
        let userFound: User;
        let totalPrice = 0;

        const { orderItems, user } = request.body;
        for (let i = 0; i < orderItems.length; i++ ) {
            let oneChairTotalPrice = 0;
            const { product, profileItems, quantity } = orderItems[i];
            let oneChairDatabaseInfo = []
            try {
                oneChairDatabaseInfo = await OrderController.validateOrder(user, product, profileItems);
            } catch(e) {
                console.log('error, write to DB', e);
                return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e));  
            }
            const oneChair = oneChairDatabaseInfo[0].entities[0];
            oneChairTotalPrice += Number(oneChair.price);
            const oneChairItems = oneChairDatabaseInfo[1].entities;
            userFound = oneChairDatabaseInfo[2].entities[0];

            for (let j = 0; j < oneChairItems.length; j++) {
                oneChairTotalPrice += Number(oneChairItems[j].price)
            }
            totalPrice += oneChairTotalPrice * quantity;
            chairPriceArray.push(oneChairTotalPrice);

            productEntities.push(oneChair);
            profileItemsEntities.push(oneChairItems);
            profileItemsEntitiesSpread.push(...oneChairItems);
        }

        const profileItemNameforEachChair = profileItemsEntitiesSpread.map(ele => ele.name);

        const { isActive, isDelete } = request.body;
        let order = new Order();
        order.totalPrice = totalPrice;
        order.pricePerSingleChair = chairPriceArray.join("|");
        order.profileItemNameforEachChair = profileItemNameforEachChair.join("|"); 
        order.isActive = isActive;
        order.isDelete = isDelete;
        order.user = userFound;

        try {
            const status = await OrderStatusController.repo.findOneOrFail({where: {status: orderStatusType.INPROGRESS}});
            order.orderStatus = status;
        } catch(e) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrNoObj, e)); 
        }
        

        try {
            const errors = await validate(order);
            if (errors.length > 0) {
                let err = new Err(HttpCode.E400, ErrStr.ErrNotValid, errors);
                return response.status(400).send(err);
            }

            await OrderController.repo.save(order);
            } catch(e) {
                console.log('error, write to DB', e);
                return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e));
        }

        // order - profileItems intermediate table
        const uniqueProfileItems = [];
        const idProfileItems = profileItemsEntitiesSpread.map(ele => ele.id) 

        for (let i = 0; i < idProfileItems.length; i++) {
            if (!uniqueProfileItems.includes(idProfileItems[i])){
                let qty = orderItems[Math.floor(i/7)].quantity;

                for (let j = i + 1; j < idProfileItems.length; j++) {
                    if (idProfileItems[i] === idProfileItems[j]) {
                        qty += orderItems[Math.floor(j/7)].quantity;
                    } 
                }
                uniqueProfileItems.push(idProfileItems[i]);

                let orderProfileItem = new OrderProfileitem();
                orderProfileItem.order = order;
                orderProfileItem.profileItem = profileItemsEntitiesSpread[i];
                orderProfileItem.amount = qty;

                try {
                    const errors = await validate(orderProfileItem);
                    if (errors.length > 0) {
                        let err = new Err(HttpCode.E400, ErrStr.ErrNotValid, errors);
                        return response.status(400).send(err);
                    }

                    await OrderProfileItemController.repo.save(orderProfileItem);
                    } catch(e) {
                        console.log('error, write to DB', e);
                        return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e));  
                } 

            } 
        }

        // order - products intermediate table
        const uniqueProducts = [];
        const idProducts = productEntities.map(ele => ele.id) 

        for (let i = 0; i < idProducts.length; i++) {
            if (!uniqueProducts.includes(idProducts[i])){
                let qty = orderItems[i].quantity;

                for (let j = i + 1; j < idProducts.length; j++) {
                    if (idProducts[i] === idProducts[j]) {
                        qty += orderItems[j].quantity;
                    } 
                }
                uniqueProducts.push(idProducts[i]);

                let orderProduct = new OrderProduct();
                orderProduct.order = order;
                orderProduct.product = productEntities[i];
                orderProduct.amount = qty;

                try {
                    const errors = await validate(orderProduct);
                    if (errors.length > 0) {
                        let err = new Err(HttpCode.E400, ErrStr.ErrNotValid, errors);
                        return response.status(400).send(err);
                    }

                    await OrderProductController.repo.save(orderProduct);
                    } catch(e) {
                        console.log('error, write to DB', e);
                        return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e));  
                } 

            } 
        }

        try {
            userFound = await UserController.repo.findOneOrFail(user, {
                relations: ['orders', 'orders.orderProduct']
            });
            redisClient.setex(`USER_${user}`, 3600 , JSON.stringify(userFound.orders));
        } catch(e) {
            return response.status(404).send(new Err(HttpCode.E404, ErrStr.ErrNoObj, e)); 
        }
        
        const resultArray = [];
        const result = {
            order: order.id,
            version: "cfGroup - version",
            author: "Mark2Win data source for internal bootcamp use only! Copyright @ http://mark2win.com",
            totalPrice,
            orderItems: resultArray,
        }
        for (let k = 0; k < productEntities.length; k++) {
            const { quantity } = orderItems[k];

            resultArray.push({
                quantity,
                price: chairPriceArray[k],
                product: productEntities[k], 
                profileItems: profileItemsEntities[k]
            })
            
        }


        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, result));
        
    }
        

    static async update(request: Request, response: Response, next: NextFunction) {
        
        const { orderId } = request.params;
        if (!orderId) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrMissingParameter));
        }

        let order = null;

        try {
            order = await OrderController.repo.findOneOrFail(orderId);
        } catch(e) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrNoObj, e));
        }

        let { product_id, quantity, profileItem_1_id, profileItem_2_id, profileItem_3_id, profileItem_4_id, profileItem_5_id, profileItem_6_id, profileItem_7_id, basePrice, totalPrice } = request.body;

        order.product_id = product_id;
        order.quantity = quantity;
        order.profileItem_1_id = profileItem_1_id;
        order.profileItem_2_id = profileItem_2_id;
        order.profileItem_3_id = profileItem_3_id;
        order.profileItem_4_id = profileItem_4_id;
        order.profileItem_5_id = profileItem_5_id;
        order.profileItem_6_id = profileItem_6_id;
        order.profileItem_7_id = profileItem_7_id;
        order.basePrice = basePrice;
        order.totalPrice = totalPrice;
        order.isActive = true;

        try {
            const errors = await validate(order);
            if (errors.length > 0) {
                return response.status(HttpCode.E400).send(new Err(HttpCode.E400, ErrStr.ErrNotValid, errors));
            }

            await OrderController.repo.save(order);
        } catch(e) {
            console.log('error, write to DB', e);
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e)); 
        }

        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK));
    }


    static async delete(request: Request, response: Response, next: NextFunction) {
        const { orderId } = request.params;
        if (!orderId) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrMissingParameter));
        } 
        
        let order = null;
        try {
            order = await OrderController.repo.findOneOrFail(orderId);
        } catch(e) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrNoObj, e));
        }

        try {
            await OrderController.repo.delete(orderId);
        } catch(e) {
            console.log('error, write to DB', e);
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e));
        }

        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK));
    }

    // test use only
    static async deleteAll(request: Request, response: Response, next: NextFunction) {
        if (!request.headers.authorization) {
            return response.status(403).send(new Err(HttpCode.E403, ErrStr.ErrNoCredentials));
        }
        
        let order = [];
        try {
            order = await OrderController.repo.find();
        } catch(e) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrNoObj, e));
        }

        try {
            await OrderController.repo.delete(order);
        } catch(e) {
            console.log('error, write to DB', e);
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e));
        }

        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK));
    }


}