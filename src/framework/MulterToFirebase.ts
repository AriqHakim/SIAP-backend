import { initializeApp } from 'firebase/app';
import multer from 'multer';
import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { firebaseConfig } from '../firebase.config';
import { giveCurrentDateTime } from './utils';
import { v4 as randomUUID } from 'uuid';

export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1048576,
  },
});

export async function uploadToFirebase(
  data: Express.Multer.File,
  folder: string,
) {
  const dateTime = giveCurrentDateTime();
  const storageRef = ref(storage, folder + '/' + randomUUID() + '_' + dateTime);
  const metadata = {
    contentType: data.mimetype,
  };
  const snapshot = await uploadBytesResumable(
    storageRef,
    data.buffer,
    metadata,
  );
  return await getDownloadURL(snapshot.ref);
}
