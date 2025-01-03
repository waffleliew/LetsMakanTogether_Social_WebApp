import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const FoodPreference = sequelize.define('FoodPreference', {
    FoodPreferenceID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    FoodType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'FoodPreference',
    timestamps: false,
});


export default FoodPreference;