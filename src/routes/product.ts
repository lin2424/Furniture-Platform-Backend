import { Router } from 'express'
import { ProductController } from '../controller/ProductController';

const productRouter = Router();

productRouter.get('/', ProductController.onePage);
productRouter.get('/all/', ProductController.all);
productRouter.get('/:productId', ProductController.one);
productRouter.post('/', ProductController.create);
productRouter.put('/:productId', ProductController.update);
productRouter.delete('/:productId', ProductController.delete);

export default productRouter;