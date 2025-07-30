const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser');
const { success, getUniqueId } = require('./helper');
const favicon = require('serve-favicon');

// Configuration Sequelize
const sequelize = new Sequelize('parc_auto', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});

// Instanciation du modèle Car
const Car = require('./src/models/car')(sequelize);

// Import des données mock
let cars = require('./src/db/mock-cars');

// Initialisation de la BDD
const initDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connexion réussie à la BDD !');

        await sequelize.sync({ force: true }); 
        console.log('Modèles synchronisés avec la base de données.');

        await Promise.all(
            cars.map(async (car) => {
                const createdCar = await Car.create({
                    name: car.name,
                    brand: car.brand,
                    year: car.year,
                    image: car.image,
                    assignedTo: [car.assignedTo],
                    assignmentDate: car.assignementDate || new Date()
                });
                console.log(createdCar.toJSON());
            })
        );

        console.log('Données mock insérées dans la BDD.');
    } catch (error) {
        console.error('Erreur lors de la connexion ou de la synchronisation :', error);
    }
};

initDb();

// Middlewares
app.use(favicon(__dirname + '/favicon.ico'));
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes API (encore sur les données mock)
app.get('/', (req, res) => {
    res.send('Hello, Express !');
});

app.get('/api/cars', (req, res) => {
    res.json(cars);
});

app.get('/api/cars/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const car = cars.find(car => car.id === id);
    const message = "Une voiture a été trouvée";
    res.json(success(message, car));
});

app.post('/api/cars', (req, res) => {
    const id = getUniqueId(cars);
    const newCar = {
        ...req.body,
        id: id,
        assignementDate: new Date()
    };
    cars.push(newCar);
    const message = `La voiture ${newCar.name} a bien été créée`;
    res.json(success(message, newCar));
});

app.put('/api/cars/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const carUpdated = { ...req.body, id: id };
    cars = cars.map(car => car.id === id ? carUpdated : car);
    const message = `La voiture ${carUpdated.name} a bien été modifiée.`;
    res.json(success(message, carUpdated));
});

app.delete('/api/cars/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const carDeleted = cars.find(car => car.id === id);
    cars = cars.filter(car => car.id !== id);
    const message = `La voiture ${carDeleted.name} a bien été supprimée.`;
    res.json(success(message, carDeleted));
});

// Lancement du serveur
app.listen(port, () =>
    console.log(`Notre application Node est démarrée sur : http://localhost:${port}`)
);
