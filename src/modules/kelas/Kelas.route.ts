import express from 'express';
import { GetAllKelas } from './presentation/GetAllKelas.presentation';
import { CreateKelas } from './presentation/CreateKelas.presentation';
import { joinKelas } from './presentation/JoinKelas.presentation';
import { getKelasByID } from './presentation/GetKelasByID.presentation';
import { deletePraktikanByUserID } from './presentation/DeletePraktikanByUserId.presentation';
import { getUserByKelas } from './presentation/GetUserByKelasID.presentation';

const router = express.Router();

router.get('/', GetAllKelas);
router.post('/', CreateKelas);
router.post('/join', joinKelas);
router.get('/:kelasId', getKelasByID);
router.delete('/:kelasId/praktikan/:userId/delete', deletePraktikanByUserID);
router.get('/:kelasId/praktikan', getUserByKelas);

export default router;
