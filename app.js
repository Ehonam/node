const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

// Import de la configuration Sequelize et fonction d'initialisation
const { initDb } = require('./src/db/sequelize');

const app = express();
const port = 3000;

// Middlewares
app.use(favicon(__dirname + '/favicon.ico'));
app.use(morgan('dev'));
app.use(bodyParser.json());

// Route de base
app.get('/', (req, res) => {
    res.json({
        message: 'Bienvenue sur l\'API de gestion du parc automobile !',
        version: '1.0.0',
        endpoints: {
            cars: {
                getAll: 'GET /api/cars',
                getById: 'GET /api/cars/:id',
                create: 'POST /api/cars',
                update: 'PUT /api/cars/:id',
                delete: 'DELETE /api/cars/:id'
            }
        }
    });
});

// Routes API modulaires
require('./src/routes/findAllCars')(app);
require('./src/routes/findCarByPk')(app);
require('./src/routes/createCar')(app);
require('./src/routes/updateCar')(app);
require('./src/routes/deleteCar')(app);

// Middleware 404 pour les routes non trouvées
app.use((req, res) => {
    res.status(404).json({
        message: `La route ${req.originalUrl} n'existe pas`,
        availableRoutes: [
            'GET /',
            'GET /api/cars',
            'GET /api/cars/:id',
            'POST /api/cars',
            'PUT /api/cars/:id',
            'DELETE /api/cars/:id'
        ]
    });
});

// Middleware de gestion d'erreurs globales
app.use((err, req, res, next) => {
    console.error('Erreur globale:', err);
    res.status(500).json({
        message: 'Erreur interne du serveur',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Une erreur s\'est produite'
    });
});

// Fonction de démarrage du serveur
const startServer = async () => {
    try {
        // Initialisation de la base de données
        await initDb();
        
        // Démarrage du serveur
        app.listen(port, () => {
            console.log('🚀 Serveur démarré avec succès !');
            console.log(`📍 URL: http://localhost:${port}`);
            console.log('📊 Base de données: connectée et initialisée');
            console.log('🛣️  Routes API disponibles:');
            console.log('   GET    /api/cars      - Liste toutes les voitures');
            console.log('   GET    /api/cars/:id  - Récupère une voiture par ID');
            console.log('   POST   /api/cars      - Crée une nouvelle voiture');
            console.log('   PUT    /api/cars/:id  - Met à jour une voiture');
            console.log('   DELETE /api/cars/:id  - Supprime une voiture');
        });
    } catch (error) {
        console.error('❌ Erreur lors du démarrage du serveur:', error);
        process.exit(1);
    }
};

// Démarrage de l'application
startServer();
