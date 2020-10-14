import { Request, Response } from 'express';
import User from '../models/User';

class UserController {
  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = new User(req.body);
      await user.save();
      res.send(user);
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  deleteOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
      res.send(user);
    } catch (error) {
      res.status(404).send(error.message);
    }
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await User.find({});
      res.send(users);
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  deleteUsers = async (req: Request, res: Response): Promise<void> => {
    const IDs = req.body;
    User.deleteMany(
      {
        _id: {
          $in: IDs
        }
      },
      (err: Error) => {
        if (err) {
          res.send(err);
        } else {
          res.send(IDs);
        }
      }
    );
  }
}

export default UserController;