const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Car', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Le nom ne peut pas être vide'
                }
            }
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'La marque ne peut pas être vide'
                }
            }
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    msg: 'L\'année doit être un nombre entier'
                },
                min: {
                    args: [1900],
                    msg: 'L\'année doit être supérieure à 1900'
                },
                max: {
                    args: [new Date().getFullYear()],
                    msg: 'L\'année ne peut pas être dans le futur'
                }
            }
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: {
                    msg: 'L\'image doit être une URL valide'
                }
            }
        },
        assignedTo: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                const value = this.getDataValue('assignedTo');
                return value ? value.split(',') : [];
            },
            set(value) {
                if (Array.isArray(value)) {
                    this.setDataValue('assignedTo', value.join(','));
                } else {
                    this.setDataValue('assignedTo', value);
                }
            }
        },
        assignmentDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false,
        tableName: 'Cars'
    });
};
