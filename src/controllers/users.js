/**
 * This file is not using!
*/

import {
  getUsers,
  deleteUserById,
  getUserById
} from "../database/UserModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();

    res.status(200).json({
      users
    });
  } catch (error) {
    res.sendStatus(400);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!id || !username) {
      return res.sendStatus(400);
    }

    const user = await getUserById(id);

    user.username = username;
    await user.save();

    res.status(200).json({
      user
    });
  } catch (error) {
    res.sendStatus(400);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.sendStatus(400);
    }

    const user = await deleteUserById(id);

    res.status(200).json({
      user
    });
  } catch (error) {
    res.sendStatus(400);
  }
};
