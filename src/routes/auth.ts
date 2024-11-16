import express from 'express';
import { UserService } from '../services/userService';
import { validate } from '../middleware/validate';
import { insertUserSchema, loginSchema } from '../db/schema';

const router = express.Router();

router.post('/register', validate(insertUserSchema), async (req, res, next) => {
  try {
    const user = await UserService.create(req.body);
    res.status(201).json({ data: user });
  } catch (error) {
    next(error);
  }
});

router.post('/login', validate(loginSchema), async (req, res, next) => {
  try {
    const result = await UserService.login(req.body);
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
});

export default router;