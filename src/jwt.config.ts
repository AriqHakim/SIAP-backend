// @Entity
import { Admin } from './entity/Admin.entity';
import { User } from './entity/User.entity';
import { AsistenPraktikum } from './entity/AsistenPraktikum.entity';

// @Interface
import { BadRequestError } from './framework/error.interface';

// @Data
import { getUserByID } from './data-repository/User.data';
import { getAdminByID } from './data-repository/Admin.data';
import { getAsistenByUserID } from './data-repository/AsistenPraktikum.data';

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
      return await getAdminByID(payload.id);
    } catch (err) {
      throw new BadRequestError(`Your user seems to be invalid or not found`);
    }
  },
};

export const jwt_config_user: JWTConfig = {
  secret_key: JWT_SECRET_KEY,
  async jwtDataAction(payload: JWTPayload) {
    try {
      const user: User = await getUserByID(payload.id);
      const asisten: AsistenPraktikum = await getAsistenByUserID(payload.id);
      return {
        user,
        asisten,
      };
    } catch (err) {
      throw new BadRequestError(`Your user seems to be invalid or not found`);
    }
  },
};
