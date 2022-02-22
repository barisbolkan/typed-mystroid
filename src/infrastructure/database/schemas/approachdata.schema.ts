import mongoose from "mongoose";

export const ApproachDataSchema = new mongoose.Schema({
    approachDate: Date,
    velocity: mongoose.SchemaTypes.Number,
    missDistance: mongoose.SchemaTypes.Number,
    orbitingBody: String
});