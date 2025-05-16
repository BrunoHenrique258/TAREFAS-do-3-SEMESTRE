import { Router } from 'express';
import { validatePetData } from '../middleswares/validatePetData';
import { createPet } from '../controllers/pet.Controller';

const router = Router();

router.post('/pets', validatePetData, createPet);

export default router;
