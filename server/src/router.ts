import { Router } from 'express';
import UserController from './controllers/userController';

const router = Router();
const userController = new UserController();

router
  .get('/', userController.getAll)
  .post('/', userController.create)
  .delete('/users', userController.deleteUsers)
  .delete('/:id', userController.deleteOne);

export default router;