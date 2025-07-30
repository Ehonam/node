const { Car } = require('../db/sequelize');

module.exports = (app) => {
    app.delete('/api/cars/:id', async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            
            if (isNaN(id)) {
                return res.status(400).json({
                    message: 'L\'ID doit être un nombre valide'
                });
            }

            // Vérifier que la voiture existe avant de la supprimer
            const car = await Car.findByPk(id);
            if (!car) {
                return res.status(404).json({
                    message: `Aucune voiture trouvée avec l'ID ${id}`
                });
            }

            // Garder une copie des données avant suppression
            const carData = car.toJSON();

            // Supprimer la voiture
            await car.destroy();

            const message = `La voiture ${carData.name} a bien été supprimée`;
            res.json({
                message,
                data: carData
            });
        } catch (error) {
            console.error('Erreur lors de la suppression de la voiture:', error);
            res.status(500).json({
                message: 'Erreur serveur lors de la suppression de la voiture',
                error: error.message
            });
        }
    });
};
