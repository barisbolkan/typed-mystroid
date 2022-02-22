import mongoose from "mongoose";

export const DiameterSchema = new mongoose.Schema({
    min: {
        type: mongoose.SchemaTypes.Number,
    },
    max: {
        type: mongoose.SchemaTypes.Number,
    }
});