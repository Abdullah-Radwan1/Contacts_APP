import { Router } from 'express';
import { getContacts } from '../controllers/contactController.js';
import { validatePagination } from '../middleware/validatePagination.js';

const router = Router();

router.get('/contacts', validatePagination, getContacts);

export default router;
