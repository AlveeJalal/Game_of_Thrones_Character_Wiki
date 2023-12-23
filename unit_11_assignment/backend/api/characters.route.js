/*Alvee Jalal
11/19/2023
IT 302001
Unit 11 Assignment 
ahj24@njit.edu*/
import express from 'express';
import charactersController from './characters.controller.js';
import impressionsController from './impressions.controller.js';

const router = express.Router();

router.route('/').get(charactersController.apiGetCharacters);
router.route("/id/:id").get(charactersController.apiGetCharacterById);
router.route("/families").get(charactersController.apiGetFamilies);
router
.route('/impressions')
.post(impressionsController.apiPostImpression)
.put(impressionsController.apiUpdateImpression)
.delete(impressionsController.apiDeleteImpression);

export default router;