"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const petSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    species: { type: String, required: true },
    age: { type: Number, required: true },
    owner: { type: String, required: true },
    ownerContact: { type: String, required: false },
});
const Pet = (0, mongoose_1.model)('Pet', petSchema);
exports.default = Pet;
