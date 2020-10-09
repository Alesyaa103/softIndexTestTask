import { Router } from 'express';
import UserController from './controllers/userController';

const router = Router();
const userController = new UserController();

router
  .get('/', userController.getAll)
  .post('/', userController.create)
  .delete('/:id', userController.delete);

export default router;