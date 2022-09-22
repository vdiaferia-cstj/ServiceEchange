import dayjs from 'dayjs';
import planets from '../data/planets.js';
import Planet from '../models/planet-model.js';

const ZERO_KELVIN = -273.15

class PlanetsRepository {

    retrieveAll(filter = {}) {
        const filtreSansWhere = {};

        const testFiltre = {discoveredBy : 'Skadex'} // Where discoveredBy = 'Skadex'

        const testFiltreAnd = {temperature : { $gt: 240}, 'position.y' : {$lt:500}}; // lesser than < , greather than >

        const testFiltreOr = {$or : [{temperature: {$gt:240}, 'position.y' : { $lt: 500}}]}; 

        return Planet.find(filter); //SELECT * FROM planets

    }
    retrieveOne(idPlanet){
        return Planet.findById(idPlanet); // SELECT * FROM planets WHERE idPlanet = [idPlanet]
    }

    create(planet)
    {
        return Planet.create(planet); // INSERT () INTO planets VALUES()s
        
    }

    delete(idPlanet){
       return Planet.findByIdAndDelete(idPlanet);
    }

    transform(planet, transformOptions)
    {
        if(transformOptions){
            //Changer les unités
        if (transformOptions.unit === 'c') {
            planet.temperature += ZERO_KELVIN;
        }
        }
        //TODO: TP - HexMatrix
      //  this.calculateHexMatrix()

        //TODO: TP - Wind Direction - Karine Moreau
      //  planet.discoveryDate = dayjs(planet.discoveryDate).format('YYYY-MM-DD') ;

        delete planet.createdAt;
        delete planet.updateAt;
        delete planet.__v;
        return planet;
    }
}

export default new PlanetsRepository();