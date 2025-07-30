const { Car } = require('../db/sequelize');

module.exports = (app) => {
    app.get('/api/cars', async (req, res) => {
        try {
            const cars = await Car.findAll();
            const message = "Voici la liste complète des voitures";
            res.json({
                message,
                data: cars
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des voitures:', error);
            res.status(500).json({
                message: 'Erreur serveur lors de la récupération des voitures',
                error: error.message
            });
        }
    });
};
