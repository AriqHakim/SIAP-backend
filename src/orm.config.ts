import * as dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config();

export const ormConfig: DataSource = new DataSource();

export default ormConfig;
