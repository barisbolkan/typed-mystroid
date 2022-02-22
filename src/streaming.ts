import { SQSHandler } from 'aws-lambda';
import { Md5 } from 'ts-md5';
import { Asteroid } from './domain/entities/asteroid.entity';
import { Diameter } from './domain/entities/diameter.entity';
import { AsteroidSchema } from './infrastructure/database/schemas/asteroid.schema';
import { fetch } from 'cross-fetch';
import mongoose from 'mongoose';

let conn = null;
const uri = 'mongodb+srv://babolkan:R39ojJx7ZFg3yb6T@copluk.ezbau.mongodb.net/mystroid';

export const handler: SQSHandler = async (_event, _context) => {
    _context.callbackWaitsForEmptyEventLoop = false;

  if (conn == null) {
    conn = mongoose.createConnection(uri, {
      serverSelectionTimeoutMS: 5000
    });
    
    // `await`ing connection after assigning to the `conn` variable
    // to avoid multiple function calls creating new connections
    await conn;
    conn.model('Asteroid', AsteroidSchema);
  }

  const M = conn.model('Asteroid');

    const json = JSON.parse(JSON.stringify(_event));
    const records = json.Records;

    let items: Asteroid[] = [];

    console.log(`Event count: ${records.length}`);
    for (const rec of records) {
        const body = JSON.parse(rec.body);

        console.log(`Retrieving page: ${body.url.toString()}`);
        const resp = await fetch(body.url.toString())
                            .then(resp => resp.json());

            resp.near_earth_objects.map(json => {
                const diameter: Diameter = {
                    min: json["estimated_diameter"]["kilometers"]["estimated_diameter_min"],
                    max: json["estimated_diameter"]["kilometers"]["estimated_diameter_max"]
                };
                    
                let asteroid: Asteroid = new Asteroid();
                asteroid.neoRefId = json["neo_reference_id"];
                asteroid.name = json["name"];
                asteroid.designation = json["designation"];
                asteroid.jplUrl = json["nasa_jpl_url"];
                asteroid.absoluteMagnitude = json["absolute_magnitude_h"];
                asteroid.isHazardous = json["is_potentially_hazardous_asteroid"];
                asteroid.isSentry = json["is_sentry_object"];
                asteroid.estimatedDiameter = diameter;
                asteroid._id = Md5.hashStr(JSON.stringify(asteroid));
                    
                return asteroid;
            }).forEach(f => items.push(f));
    }

    const bulkData = items.map(item => (
        {
            replaceOne: {
                upsert: true,
                filter: {
                    _id: item._id
                },
                replacement: item
            }
        }
    ));
    await M.bulkWrite(bulkData);
    return {};
};