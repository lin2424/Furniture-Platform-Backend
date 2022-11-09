import { Router } from "express";
import order from "./order"
import payment from "./payment"
import profileItem from "./profileItem";
import paymentStatus from "./paymentStatus";
import orderStatus from "./orderStatus";

const routes = Router();

routes.use('/payment', payment);
routes.use('/order', order);
routes.use('/profileItem', profileItem);
routes.use('/paymentStatus', paymentStatus);
routes.use('/orderStatus', orderStatus);

export default routes;