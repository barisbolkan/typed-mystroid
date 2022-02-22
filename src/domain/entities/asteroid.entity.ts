import { ApproachData } from "./approachdata.entity";
import { Diameter } from "./diameter.entity";

export class Asteroid {
    _id: string;
    neoRefId: number;
    name: string;
    designation: string;
    jplUrl: string;
    absoluteMagnitude: number;
    estimatedDiameter: Diameter;
    isHazardous: boolean;
    isSentry: boolean;
    closeApproachData: ApproachData[];
}