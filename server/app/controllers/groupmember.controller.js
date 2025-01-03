import express from 'express';
import GroupMember from '../models/GroupMember.js';
import Group from '../models/Group.js';
import User from '../models/User.js';

const router = express.Router();

// GET all group members
router.get('/group-members', async (req, res) => {
    try {
        const groupMembers = await GroupMember.findAll();
        res.status(200).json(groupMembers);
    } catch(error) {
        res.status(500).json({ message: error.message || "An error occurred while retrieving all group members." });
    }
});

router.get('/group-members/user/:UserID', async (req, res) => {
    try {
        const UserID = req.params.UserID;
        const userGroups = await GroupMember.findAll({ where: { UserID } });
        for (let u of userGroups) {
            const gs = await Group.findAll({ where: { GroupID: u.GroupID }});
            for (let g of gs) {
                u.setDataValue('GroupName', g.GroupName);
            }

        }
        res.send(userGroups);
    } catch(error) {
        res.status(500).json({ message: error.message || `An error occurred while retrieving group members for user ${UserID}` });
    }
});

router.get('/group-members/:GroupID', async (req, res) => {
    try {
        let memberNames = [];
        const GroupID = req.params.GroupID;
        const members = await GroupMember.findAll({ where: { GroupID } });
        for (let member of members) {
            const users = await User.findAll({ where: { UserID: member.UserID }});
            for (let user of users) {
                memberNames.push(user.Name);
            }

        }
        res.send(memberNames);
    } catch(error) {
        res.status(500).json({ message: error.message || `An error occurred while retrieving group members for user ${UserID}` });
    }
});

// POST new group member
router.post('/group-members', async (req, res) => {
    try {
        const { UserID, GroupID } = req.body;
        const newGroupMember = await GroupMember.create({
            UserID,
            GroupID
        });
        res.send(newGroupMember);
    } catch(error) {
        res.status(500).json({ message: error.message || "An error occurred while creating a new group member." });
    }
});

// DELETE a group member
router.delete('/group-members/:userId/:groupId', async (req, res) => {
    const { userId, groupId } = req.params;
    try {
        const result = await GroupMember.destroy({
            where: {
                UserID: userId,
                GroupID: groupId
            }
        });

        if (result === 0) {
            return res.status(404).json({ message: `No GroupMember found with UserID=${userId} and GroupID=${groupId}` });
        }

        res.status(204).json({ message: `Deleted GroupMember with UserID=${userId} and GroupID=${groupId}` });
    } catch(error) {
        res.status(500).json({ message: error.message || `An error occurred while deleting the group member with UserID=${userId} and GroupID=${groupId}` });
    }
});

export default router;