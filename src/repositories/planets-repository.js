import dayjs from 'dayjs';
import planets from '../data/planets.js';
import Planet from '../models/planet-model.js';

class PlanetsRepository {

    retrieveAll() {
        //SELECT * FROM planets
        return Planet.find();

    }
    retrieveOne(idPlanet){
        return Planet.findById(idPlanet); // SELECT * FROM planets WHERE idPlanet = [idPlanet]
    }

    create(planet)
    {
        return Planet.create(planet); // INSERT () INTO planets VALUES()s
        
    }

    transform(planet)
    {
        planet.discoveryDate = dayjs(planet.discoveryDate).format('YYYY-MM-DD') ;
        delete planet.createdAt;
        delete planet.updateAt;
        delete planet.__v;
        return planet;
    }
}

export default new PlanetsRepository();