const { Car } = require('../db/sequelize');

module.exports = (app) => {
    app.get('/api/cars/:id', async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            
            if (isNaN(id)) {
                return res.status(400).json({
                    message: 'L\'ID doit être un nombre valide'
                });
            }

            const car = await Car.findByPk(id);
            
            if (!car) {
                return res.status(404).json({
                    message: `Aucune voiture trouvée avec l'ID ${id}`
                });
            }

            const message = "Une voiture a été trouvée";
            res.json({
                message,
                data: car
            });
        } catch (error) {
            console.error('Erreur lors de la récupération de la voiture:', error);
            res.status(500).json({
                message: 'Erreur serveur lors de la récupération de la voiture',
                error: error.message
            });
        }
    });
};
