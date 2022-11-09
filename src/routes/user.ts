import { Router } from 'express'
import { UserController } from '../controller/UserController';

const userRouter = Router();

userRouter.get('/', UserController.all);
userRouter.get('/:userId', UserController.one);
userRouter.post('/register', UserController.register);
userRouter.post('/login', UserController.login);
userRouter.put('/login', UserController.changePassword);
userRouter.delete('/:productId', UserController.delete);

export default userRouter;