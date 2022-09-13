import express from 'express';
import { HttpError } from 'http-errors';
import PLANETS from '../data/planets.js';
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

    getAll(req, res , next){
        res.status(200);
       
        res.json(PLANETS);
    }

    // /planets/400
    getOne(req,res ,next)  {

        
       /* for(let planet of PLANETS){
            if (planet.id === idPlanet)
            //Trouver la planète recherchée
            res.status(200);
            res.json(planet);
            break;
        }
        res.status(404);
        res.end();
        */
       const idPlanet = parseInt(req.params.idPlanet,10);
        const planet = PLANETS.filter((p) => p.id === idPlanet);
        if (planet.length > 0) {
            res.status(200);
            res.json(planet[0]);
        }
        else{
        return next(HttpError.NotFound(`La planète avec l'identifiant ${idPlanet} n'existe pas`));

        }
    }

    post (req,res,next)    {}
}

new PlanetsRoutes();
export default routeur;
