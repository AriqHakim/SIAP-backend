import AppDataSource from '../orm.config';
import { Attachment } from '../entity/Attachment.entity';

const repository = AppDataSource.getRepository(Attachment);

export async function upsertAttachment(data: Attachment) {
  return await repository.save(data);
}
