// @Entity
import { Admin } from './entity/Admin.entity';
import { User } from './entity/User.entity';

// @Interface
import { BadRequestError } from './framework/error.interface';

// @Util
import { JWTConfig } from './framework/JWTConfig.interface';
import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY ?? 'sample-key';

export interface JWTPayload {
  id: string;
}

export function signJWT(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET_KEY);
}

export const jwt_config_admin: JWTConfig = {
  secret_key: JWT_SECRET_KEY,
  async jwtDataAction(payload: JWTPayload): Promise<Admin> {
    try {
      //   return await AdminData.getAdminByID(payload.id);
      //   search admin
      return null;
    } catch (err) {
      throw new BadRequestError(`Your user seems to be invalid or not found`);
    }
  },
};

export const jwt_config_user: JWTConfig = {
  secret_key: JWT_SECRET_KEY,
  async jwtDataAction(payload: JWTPayload): Promise<User> {
    try {
      //   return await AdminData.getAdminByID(payload.id);
      //   serach user
      return null;
    } catch (err) {
      throw new BadRequestError(`Your user seems to be invalid or not found`);
    }
  },
};
