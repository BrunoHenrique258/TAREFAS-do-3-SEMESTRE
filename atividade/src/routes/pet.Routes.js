"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validatePetData_1 = require("../middleswares/validatePetData");
const pet_Controller_1 = require("../controllers/pet.Controller");
const router = (0, express_1.Router)();
router.post('/pets', validatePetData_1.validatePetData, pet_Controller_1.createPet);
exports.default = router;
