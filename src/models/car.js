const { DataTypes } = require('sequelize');
const {Sequelize} = require('../db/sequelize');

module.exports = (sequelize)=>{
    return sequelize.define('Car',{

    
    id :{
        type : DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    brand: {
        type:DataTypes.STRING,
        allowNull:false
    },
    year :{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    image: {
        type : DataTypes.STRING,
        allowNull : false
    },
    assignedTo:{
        type : DataTypes.STRING,
        allowNull:false,
        get(){
            return this.getDataValue('assignedTo').split(',');
        },
        set(value){
            this.setDataValue('assignedTo', value.join(','))
        }
    },
    assignmentDate:{
        type:DataTypes.DATE,
        allowNull:false     
    }

}, {
    timestamps: true,
    createdAt:'created',
    updatedAt:false
});
};

