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

async deleteOne(req,res,next){
    try {
        const idPlanet = req.params.idPlanet;
        const deleteResult = await planetsRepository.delete(idPlanet);
        if (deleteResult) {
            console.log(deleteResult);
            res.status(204).end();
        }
        else
        {
return next(HttpError.NotFound(`La planète avec l'identifiant ${req.params.idPlanet} n'existe pas.`));
        }
} catch(err){
    return next(err);
}
    
}



async getAll(req, res , next){
       
        try {

            const transformOptions ={};
            const filter = {};
            if (req.query.explorer){
                filter.discoveredBy = req.query.explorer;
            }





            if(req.query.unit){
                const unit = req.query.unit;
                if (unit === 'c'){
                    transformOptions.unit = unit;
                }
                else {
                return next(HttpError.BadRequest('Le paramètre unit doit avoir comme valeur c pour Celsius'));    
                }
            }

            let planets =  await planetsRepository.retrieveAll(filter);

            //Transformation
            //Map == boucle
            planets = planets.map(p => {
                p = p.toObject({getters: false, virtuals:false});
                p = planetsRepository.transform(p, transformOptions);
                return p;
                });


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
