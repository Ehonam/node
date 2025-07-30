const { Sequelize } = require('sequelize');

// Configuration de la connexion
const sequelize = new Sequelize('parc_auto', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});

// Import du modèle Car
const Car = require('../models/car')(sequelize, Sequelize.DataTypes);

// Import des données mock
const mockCars = require('./mock-cars');

// Fonction d'initialisation de la base de données
const initDb = async () => {
    try {
        // Test de connexion
        await sequelize.authenticate();
        console.log('✅ Connexion réussie à la BDD !');

        // Synchronisation des modèles (force: true pour le développement)
        await sequelize.sync({ force: true });
        console.log('✅ Modèles synchronisés avec la base de données.');

        // Insertion des données mock
        await Promise.all(
            mockCars.map(async (car) => {
                const createdCar = await Car.create({
                    name: car.name,
                    brand: car.brand,
                    year: car.year,
                    image: car.image,
                    assignedTo: [car.assignedTo], // Tableau pour le setter
                    assignmentDate: car.assignementDate || new Date()
                });
                console.log(`✅ Voiture créée: ${createdCar.name}`);
            })
        );

        console.log('✅ Données mock insérées dans la BDD.');
    } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation de la BDD:', error);
        throw error;
    }
};

module.exports = {
    sequelize,
    Car,
    initDb
};
