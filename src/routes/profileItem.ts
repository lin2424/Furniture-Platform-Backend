import { Router } from 'express'
import { ProfileItemController } from '../controller/ProfileItemController';

const router = Router();


router.get('/', ProfileItemController.all);
router.get('/:productId', ProfileItemController.one);
router.post('/', ProfileItemController.create);
router.put('/:productId', ProfileItemController.update);
router.delete('/:productId', ProfileItemController.delete);

export default router;