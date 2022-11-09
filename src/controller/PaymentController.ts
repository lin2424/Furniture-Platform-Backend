import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { Payment } from "../entity/Payment";
import { validate } from "class-validator";
import { Err, ErrStr, HttpCode } from "../helper/Err";
import {IdCheckRes, MKController} from "./MKController";
import {OrderController} from "./OrderController";
import {PaymentStatusController} from "./PaymentStatusController";
import { PaymentStatus } from "../entity/PaymentStatus";
import { orderStatusType } from "../entity/OrderStatus";
import { OrderStatusController } from "./OrderStatusController";
import { createClient } from 'redis';
import { UserController } from "./UserController";

export class PaymentController extends MKController{

    public static get repo(){
        return getRepository(Payment);
    }

    static async validatePayment(orderId: string , statusId: number) {
        if (typeof orderId !== 'string' || typeof statusId !== 'number')
        {
            throw (new Err(HttpCode.E400, 'invalid orderId or statusId'));
        }
        let res: IdCheckRes[] = [];

        try {
            let temp = await PaymentController.checkSingleIdExist(orderId, OrderController.repo);
            if (temp.index !== -1) {
                throw (new Err(HttpCode.E400, 'invalid Order id' + temp.index));
            }
            res.push(temp);

            temp = await PaymentController.checkSingleIdExist(statusId, PaymentStatusController.repo);
            if (temp.index !== -1) {
                throw (new Err(HttpCode.E400, 'invalid status id' + temp.index));
            }
            res.push(temp);

        } catch (e) {
            console.log('error, write to db', e);
            throw (new Err(HttpCode.E400, 'invalid Order id', e));
        }
        return res
    }

    static async all(request: Request, response: Response, next: NextFunction) {
        let payments: Payment[] = [];

        try {
            payments = await PaymentController.repo.find();
        } catch(e) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrNoObj, e));
        }
        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, payments));
    }

    static async one(request: Request, response: Response, next: NextFunction) {
        const { paymentId } = request.params;
        if (!paymentId) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrMissingParameter));
        }

        let payment = null;

        try {
            payment = await PaymentController.repo.findOneOrFail({where: {id: paymentId}});
        } catch(e) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrNoObj, e));
        }
        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, payment));
    }

    static async create(request: Request, response: Response, next: NextFunction) {
        console.log('123131231')
        let { orderId, firstName, lastName, phone, shipping_address, billing_address, payment_Plan, payment_type, paymentStatus, shipping_option } = request.body;

        let payment = new Payment();
        payment.id = orderId;
        payment.firstName = firstName;
        payment.lastName = lastName;
        payment.phone = phone;
        payment.billing_address = billing_address;
        payment.shipping_address = shipping_address;
        payment.payment_Plan = payment_Plan;
        payment.payment_type = payment_type;
        payment.shipping_option = shipping_option;
        payment.isActive = true;

        try {
            const errors = await validate(payment);
            if (errors.length > 0) {
                return response.status(HttpCode.E400).send(new Err(HttpCode.E400, ErrStr.ErrNotValid, errors));
            }

            let res = await PaymentController.validatePayment(orderId, paymentStatus);

            payment.order = res[0].entities[0];

            payment.paymentStatus = res[1].entities[0];

            let preTaxTotalPrice = res[0].entities[0].totalPrice;
            payment.preTaxTotalPrice = preTaxTotalPrice;
            payment.taxRate = 1.13; //hardCode here, may change later
            payment.afterTaxTotalPrice = parseFloat((preTaxTotalPrice * 1.13).toFixed(2));

            await PaymentController.repo.save(payment);
                 

        } catch (e) {
            console.log('error, write to DB', e);
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e));
        }

        return response.status(HttpCode.E200).send(new Err(HttpCode.E200, ErrStr.OK, payment.id));
    }

    // update status upon successful payment, do not update other informations here
    static async update(request: Request, response: Response, next: NextFunction) {
        const redisClient = createClient();
        const {userId} = request.params;
        const { paymentStatus, paymentId } = request.body;

        if (!paymentId) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrMissingParameter));
        }

        let payment: Payment;
        try {
            payment = await PaymentController.repo.findOneOrFail({where: {id: paymentId}});
        } catch (e) {
            return response.status(400).send(new Err(HttpCode.E404, ErrStr.ErrNoObj));
        }


        let paymentStatusFound: PaymentStatus;
        try {
            paymentStatusFound = await PaymentStatusController.repo.findOneOrFail({where: {id: paymentStatus}});
        } catch (e) {
            return response.status(400).send(new Err(HttpCode.E404, ErrStr.ErrNoObj));
        }

        try {
            payment.paymentStatus = paymentStatusFound;
            const orderFound = await OrderController.repo.findOne({where: {id: paymentId}});
            payment.order = orderFound;

            const errors = await validate(payment);
            if (errors.length > 0) {
                return response.status(HttpCode.E400).send(new Err(HttpCode.E400, ErrStr.ErrNotValid, errors))
            }

            await PaymentController.repo.save(payment);

            const updateStatus = await OrderStatusController.repo.findOne({where: {status: orderStatusType.PAYMENTRECEIVED}})

            await OrderController.repo.update({id: paymentId}, {orderStatus: updateStatus});  

        } catch (e) {
            console.log('error, write to DB', e);
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e));
        }

        try {
            let userFound = await UserController.repo.findOneOrFail(userId, {
                relations: ['orders', 'orders.orderProduct']
            });
            redisClient.setex(`USER_${userId}`, 3600 , JSON.stringify(userFound.orders));
        } catch(e) {
            return response.status(404).send(new Err(HttpCode.E404, ErrStr.ErrNoObj, e)); 
        }

        return response.status(HttpCode.E200).send(new Err(HttpCode.E200, ErrStr.OK));

    }

    static async delete(request: Request, response: Response, next: NextFunction) {
        const { paymentId } = request.params;
        if (!paymentId) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrMissingParameter));
        }


        let payment = null;
        try {
            payment = await PaymentController.repo.findOneOrFail(paymentId);
        } catch(e) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrNoObj, e));
        }

        try {
            await PaymentController.repo.delete(paymentId);
        } catch(e) {
            console.log('error, write to DB', e);
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e));
        }

        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK));
    }

}