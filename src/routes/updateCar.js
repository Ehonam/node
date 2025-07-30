const { Car } = require('../db/sequelize');

module.exports = (app) => {
    app.put('/api/cars/:id', async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            
            if (isNaN(id)) {
                return res.status(400).json({
                    message: 'L\'ID doit être un nombre valide'
                });
            }

            // Vérifier que la voiture existe
            const car = await Car.findByPk(id);
            if (!car) {
                return res.status(404).json({
                    message: `Aucune voiture trouvée avec l'ID ${id}`
                });
            }

            // Préparer les données à mettre à jour
            const updateData = { ...req.body };
            
            // Gérer le champ assignedTo s'il est présent
            if (updateData.assignedTo && !Array.isArray(updateData.assignedTo)) {
                updateData.assignedTo = [updateData.assignedTo];
            }

            // Effectuer la mise à jour
            await Car.update(updateData, {
                where: { id: id }
            });

            // Récupérer la voiture mise à jour
            const updatedCar = await Car.findByPk(id);

            const message = `La voiture ${updatedCar.name} a bien été modifiée`;
            res.json({
                message,
                data: updatedCar
            });
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la voiture:', error);
            
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
                message: 'Erreur serveur lors de la mise à jour de la voiture',
                error: error.message
            });
        }
    });
};
