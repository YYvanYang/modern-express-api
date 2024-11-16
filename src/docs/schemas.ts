import { generateSchema, extendApi } from '@anatine/zod-openapi';
import { insertUserSchema, loginSchema, updateUserSchema } from '../db/schema';

export const apiSchemas = {
  User: generateSchema(extendApi(insertUserSchema.omit({ password: true }), {
    description: 'User object without password'
  })),
  CreateUser: generateSchema(extendApi(insertUserSchema, {
    description: 'Data for creating a new user'
  })),
  UpdateUser: generateSchema(extendApi(updateUserSchema, {
    description: 'Data for updating an existing user'
  })),
  Login: generateSchema(extendApi(loginSchema, {
    description: 'Login credentials'
  })),
  Error: {
    type: 'object',
    properties: {
      error: {
        type: 'object',
        properties: {
          code: { type: 'string' },
          message: { type: 'string' },
          details: { type: 'object' },
          request_id: { type: 'string' },
          timestamp: { type: 'string', format: 'date-time' }
        },
        required: ['code', 'message', 'timestamp']
      }
    }
  }
};