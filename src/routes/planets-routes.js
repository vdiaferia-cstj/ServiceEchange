import express from 'express';
import PLANETS from '../data/planets.js';
const routeur = express.Router();

class PlanetsRoutes{
    // Nous sommes déjà sous le path /planets
    constructor(){
        routeur.get('/',this.getAll); // /planets
        routeur.get('/:idPlanet',this.getOne); // /planets/:idPlanet
        routeur.post(''); // /planets

    }

    getAll(req, res , next){
        res.status(200);
        console.log('GET ALL PLANETS');
        res.json(PLANETS);
    }

    getOne(req,res ,next)  {
        res.status(200);
        console.log('GET ONE');
    }

    post (req,res,next)    {
        res.status(200);
        console.log('POST');
    }
}

new PlanetsRoutes();
export default routeur;
