import express from 'express';
import UserRegionPreference from '../models/UserRegionPreference.js';
import RegionPreference from '../models/RegionPreference.js';

const router = express.Router();

// Get all Preferences by UserID
router.get('/user-region-preferences/:UserID', async (req, res) => {
    try {
        const preferences = await UserRegionPreference.findAll({ where: { UserID: req.params.UserID } });
        for (let pref of preferences) {
            const rp = await RegionPreference.findByPk(pref.RegionPreferenceID);
            pref.setDataValue('RegionType', rp.RegionType);
        }
        res.send(preferences);
    } catch (error) {
        res.status(500).send({
            message: error.message || "An error occurred while retrieving preferences."
        });
    }
});

// Add a Preference
router.post('/user-region-preferences', async (req, res) => {
    const { UserID, pref } = req.body;
    try {
        await UserRegionPreference.destroy({ where: { UserID } });
        const preferencesToAdd = pref.map(RegionPreferenceID => ({ UserID, RegionPreferenceID }));
        const batchPreferences = await UserRegionPreference.bulkCreate(preferencesToAdd);
        res.send(batchPreferences);
    } catch (error) {
        res.status(500).send({ message: error.message || "An error occurred while updating preferences." });
    }
});

// Delete a Preference
router.delete('/user-region-preferences/:id', async (req, res) => {
    try {
        const num = await UserRegionPreference.destroy({ where: { UserRegionPreferenceID: req.params.id } });
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