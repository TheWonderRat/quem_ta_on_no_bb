import { Router } from 'express';

import userRouter from './aprovado.routes';
import listarRouter from './lista.routes';

const router = Router();

router.use('/listar', listarRouter);
router.use('/usuario', userRouter);

export default router;
