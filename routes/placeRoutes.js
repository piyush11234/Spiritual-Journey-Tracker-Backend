import express from 'express'
import { createPlace, deletePlace, getALLPlaces, getPlaceById, updatePlace } from '../controllers/placeController.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';


const router=express.Router();

router.post('/create',isAuthenticated, createPlace);
router.get('/',isAuthenticated, getALLPlaces);
router.get('/:id',isAuthenticated, getPlaceById);
router.put('/update/:id',isAuthenticated,updatePlace);
router.delete('/delete/:id',deletePlace);


export default router;