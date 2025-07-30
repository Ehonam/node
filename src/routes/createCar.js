const { Car } = require('../db/sequelize');

module.exports = (app) => {
    app.post('/api/cars', async (req, res) => {
        try {
            // Validation des données requises
            const { name, brand, year, image, assignedTo, assignmentDate } = req.body;
            
            if (!name || !brand || !year || !image || !assignedTo) {
                return res.status(400).json({
                    message: 'Tous les champs sont requis: name, brand, year, image, assignedTo'
                });
            }

            // Création de la voiture
            const newCar = await Car.create({
                name,
                brand,
                year,
                image,
                assignedTo: Array.isArray(assignedTo) ? assignedTo : [assignedTo],
                assignmentDate: assignmentDate || new Date()
            });

            const message = `La voiture ${newCar.name} a bien été créée`;
            res.status(201).json({
                message,
                data: newCar
            });
        } catch (error) {
            console.error('Erreur lors de la création de la voiture:', error);
            
            // Gestion des erreurs de validation Sequelize
            if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({
                    message: 'Données invalides',
                    errors: error.errors.map(err => ({
                        field: err.path,
                        message: err.message
                    }))
                });
            }
            
            res.status(500).json({
                message: 'Erreur serveur lors de la création de la voiture',
                error: error.message
            });
        }
    });
};
