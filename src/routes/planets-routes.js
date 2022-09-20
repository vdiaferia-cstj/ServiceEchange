import express from 'express';
import { HttpError } from 'http-errors';
import PLANETS from '../data/planets.js';
import planetsRepository from '../repositories/planets-repository.js'
const routeur = express.Router();

class PlanetsRoutes{
    // Nous sommes déjà sous le path /planets
    constructor(){
        routeur.get('/',this.getAll); // /planets
        routeur.get('/:idPlanet',this.getOne); // /planets/:idPlanet
        routeur.post('/', this.post); // /planets
        routeur.delete('/:idPlanet', this.deleteOne)
    }

deleteOne(req,res,next){
    const idPlanet = parseInt(req.params.idPlanet,10);
    const index = PLANETS.findIndex( p => p.id === idPlanet);
    if (index === -1) {
        return next(HttpError.NotFound());

    }
    PLANETS.splice(index,1);
    res.status(204).end();
}



async getAll(req, res , next){
       
        try {
            const planets =  await planetsRepository.retrieveAll();
            console.log(planets);
            res.status(200).json(planets);
        }catch(err) {
            return next(err);
        }
     }

    // /planets/400
 async getOne(req,res ,next)  {
    try
    {
        let planet = await planetsRepository.retrieveOne(req.params.idPlanet);

    if (!planet) {
        return next(HttpError.NotFound(`La planète avec l'identifiant ${req.params.idPlanet} n'existe pas.`));
            
    }
    // Transformer/Nettoyer l'objet avant de l'envoyer dans la réponse
    planet = planet.toObject({getters:false, virtuals:false});
    planet = planetsRepository.transform(planet);
    res.status(200).json(planet);
    } 
    catch(err)
     {
        return next(err);
    }
    }

async post (req,res,next){
try 
{
    //TODO: Validation S08
    let newPlanet = await planetsRepository.create(req.body);

    newPlanet = newPlanet.toObject ({getters:false, virtuals:false});
    newPlanet = await planetsRepository.transform(newPlanet);

    res.status(201).json(newPlanet);
    

}

catch(err)
{
return next(err);
}

}
}

new PlanetsRoutes();
export default routeur;
