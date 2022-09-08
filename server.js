import chalk from 'chalk';
import app from './src/app.js';

const PORT = 4200;

app.listen(PORT, err => {

    if(err) {
        //Nous avons une erreur, on pourrait faire du code plus brillant.
    process.exit(1);
    }



    console.log(chalk.blue(`Server listenig on port ${PORT}`));
});

console.log(chalk.red.bgBlueBright('Test'));