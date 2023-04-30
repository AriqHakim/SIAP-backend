// @Entity
import { Admin } from './entity/Admin.entity';
import { User } from './entity/User.entity';
import { AsistenPraktikum } from './entity/AsistenPraktikum.entity';

// @Interface
import { BadRequestError } from './framework/error.interface';

// @Data
import { getUserByID } from './modules/data-repository/User.data';

// @Util
import { JWTConfig } from './framework/JWTConfig.interface';
import jwt from 'jsonwebtoken';
import { getAsistenByUserID } from './modules/data-repository/Asisten.data';

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
      // return await AdminData.getAdminByID(payload.id);
      //   search admin
      return null;
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
        user: user,
        asisten: asisten,
      };
    } catch (err) {
      throw new BadRequestError(`Your user seems to be invalid or not found`);
    }
  },
};
