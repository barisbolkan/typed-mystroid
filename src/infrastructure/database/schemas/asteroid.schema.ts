import * as mongoose from 'mongoose'
import { ApproachDataSchema } from './approachdata.schema';
import { DiameterSchema } from './diameter.schema';

export const AsteroidSchema = new mongoose.Schema({
    _id: mongoose.SchemaTypes.String,
    neoRefId: {
        type: mongoose.SchemaTypes.Number,
    },
    name: {
        type: String, 
    },
    designation: {
        type: String, 
    },
    jplUrl: {
        type: String, 
    },
    absoluteMagnitude: {
        type: mongoose.SchemaTypes.Number,
    },
    isHazardous: mongoose.SchemaTypes.Boolean,
    isSentry: mongoose.SchemaTypes.Boolean,
    estimatedDiameter: DiameterSchema,
    closeApproachData: [ApproachDataSchema]
});