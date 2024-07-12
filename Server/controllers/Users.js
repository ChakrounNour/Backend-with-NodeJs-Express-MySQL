import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["uuid", "name", "email", "role"],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.msg });
  }
};
export const getUsersById = async (req, res) => {
  try {
    const users = await Users.findOne({
      where: { uuid: req.params.id },
      attributes: ["id", "name", "email", "role"],
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.msg });
  }
};
export const updateUser = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;

  try {
    const user = await Users.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }

    let hashPassword = user.password;

    if (password && password !== "" && password !== null) {
      const salt = await bcrypt.genSalt();
      hashPassword = await bcrypt.hash(password, salt);
    }

    if (password !== confPassword) {
      return res
        .status(400)
        .json({
          msg: "Le mot de passe et la confirmation ne correspondent pas",
        });
    }

    await Users.update(
      {
        name: name || user.name,
        email: email || user.email,
        password: hashPassword,
        role: role || user.role,
      },
      {
        where: {
          id: user.id,
        },
      }
    );

    res.status(200).json({ msg: "Utilisateur mis à jour avec succès" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password and Confirm Password do not match" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role === "admin" ? "admin" : "utilisateur",
    });
    res.status(201).json({ msg: "Registration Successful" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.msg });
  }
};
export const deleteUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "utilisateur non trouvé" });
  try {
    await Users.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "User Delete" });
  } catch (error) {
    res.status(400).json({ msg: error.msg });
  }
};