import { Router } from "express";
import { PaymentController } from "../controller/PaymentController";

const router = Router();


router.get('/', PaymentController.all);
router.get('/:paymentId/', PaymentController.one);
router.post('/', PaymentController.create);
router.put('/:userId/', PaymentController.update);
router.delete('/:paymentId/', PaymentController.delete);


export default router;