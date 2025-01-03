import express from 'express';
import UserFoodPreference from '../models/UserFoodPreference.js';
import FoodPreference from "../models/FoodPreference.js";

const router = express.Router();

// Get all Preferences by UserID
router.get('/user-food-preferences/:UserID', async (req, res) => {
    try {
        const preferences = await UserFoodPreference.findAll({ where: { UserID: req.params.UserID } });
        for (let pref of preferences) {
            const fp = await FoodPreference.findByPk(pref.FoodPreferenceID);
            pref.setDataValue('FoodType', fp.FoodType);
        }
        res.send(preferences);
    } catch (error) {
        res.status(500).send({
            message: error.message || "An error occurred while retrieving preferences."
        });
    }
});

// Add a Preference
router.post('/user-food-preferences', async (req, res) => {
    const { UserID, pref } = req.body;
    try {
        await UserFoodPreference.destroy({ where: { UserID } });
        const preferencesToAdd = pref.map(FoodPreferenceID => ({ UserID, FoodPreferenceID }));
        const batchPreferences = await UserFoodPreference.bulkCreate(preferencesToAdd);
        res.send(batchPreferences);
    } catch (error) {
        res.status(500).send({ message: error.message || "An error occurred while updating preferences." });
    }
});

// Delete a Preference
router.delete('/user-food-preferences/:id', async (req, res) => {
    try {
        const num = await UserFoodPreference.destroy({ where: { UserFoodPreferenceID: req.params.id } });
        if (num === 1) {
            res.send({ message: "Preference was deleted successfully." });
        } else {
            res.send({ message: "Unable to delete preference." });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "An error occurred while deleting the preference."
        });
    }
});

export default router;