import express from 'express';
import { UserService } from '../services/userService';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { updateUserSchema } from '../db/schema';
import { AuthorizationError } from '../utils/errors';

const router = express.Router();

router
  .route('/')
  .get(authenticate, authorize('admin'), async (req, res, next) => {
    try {
      const users = await UserService.list({
        page: Number(req.query.page),
        per_page: Number(req.query.per_page),
        sort: req.query.sort?.toString(),
        fields: req.query.fields?.toString().split(',')
      });
      res.json({ data: users });
    } catch (error) {
      next(error);
    }
  });

router
  .route('/:id')
  .get(authenticate, async (req, res, next) => {
    try {
      const user = await UserService.findById(req.params.id);
      res.json({ data: user });
    } catch (error) {
      next(error);
    }
  })
  .patch(
    authenticate,
    validate(updateUserSchema),
    async (req, res, next) => {
      try {
        // 只允许管理员修改其他用户，普通用户只能修改自己
        if (req.user?.role !== 'admin' && req.user?.id !== req.params.id) {
          throw new AuthorizationError();
        }

        const user = await UserService.update(req.params.id, req.body);
        res.json({ data: user });
      } catch (error) {
        next(error);
      }
    }
  )
  .delete(
    authenticate,
    authorize('admin'),
    async (req, res, next) => {
      try {
        await UserService.delete(req.params.id);
        res.status(204).send();
      } catch (error) {
        next(error);
      }
    }
  );

export default router;