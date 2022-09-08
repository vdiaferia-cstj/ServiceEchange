import express from 'express';
import dayjs from 'dayjs';
import planetsRoutes from './routes/planets-routes.js'


const app = express();

//TODO: Ajouter du code ici



app.get('/deuxieme',(req,res)=>{
    res.status(200)
    res.set('Content-Type','text/plain');
    res.send('Première route avec express');
});

app.get('/date', (req,res) => {
    res.status(200);
    res.set('Content-Type','text/plain');
    const today = dayjs();
    res.send(today.format());
});

app.get('/maths/:/operation', (req,res) => {
    const a = parseInt(req.query.a, 10);
    const b =parseInt(req.query.b, 10);
    let somme =0;


    const operation = req.params.operation;

switch (operation) {
    case 'addition':
        somme = a + b;
    break;

    case 'soustraction':
        somme = a - b;
    break;

    case 'multiplication':
        somme = a * b;
        break;
    case 'division':
        somme = a / b ;
    break;
}

     
    res.status(200);
    res.set('Content-Type', 'text/plain');
    res.send(somme.toString);
    
});

app.get('/planets',planetsRoutes);

export default app;