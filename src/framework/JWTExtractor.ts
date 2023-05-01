import { JWTConfig } from './JWTConfig.interface';
import { InternalServerError, UnauthorizedError } from './error.interface';
import jwt from 'jsonwebtoken';

export async function extractDataFromJWT(
  jwt_config: JWTConfig,
  authorization_token: string,
) {
  if (!jwt_config.jwtDataAction) {
    throw new InternalServerError(`JWT Action can not bet empty`);
  }

  if (!jwt_config.secret_key) {
    throw new InternalServerError(`JWT Secret Key can not bet empty`);
  }

  const [_, token] = authorization_token.split(' ');
  const temp_jwt_config = jwt_config;

  return new Promise((resolve, reject) => {
    jwt.verify(token, temp_jwt_config.secret_key, async (err, data) => {
      if (err) {
        reject(err.toString());
      }
      try {
        const result_payload: Record<string, unknown> =
          await temp_jwt_config.jwtDataAction(data);
        if (!result_payload) {
          throw new UnauthorizedError('You are not authorized');
        }
        resolve(result_payload);
      } catch (err) {
        reject(err);
      }
    });
  });
}
