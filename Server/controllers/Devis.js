import { Op } from "sequelize";
import Users from "../models/UserModel.js";
import Devis from "../models/DevisModel.js";
import Contact from "../models/ContactModel.js";

export const getDevis = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Devis.findAll({
        attributes: [
          "uuid",
          "nom",
          "prenom",
          "email",
          "societe",
          "produit",
          "tel",
          "pays",
          "message",
        ]
      });
    } else {
      return res.json({ msg: "Accès interdit" });
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ msg: err.msg });
  }
};
export const getDevisById = async (req, res) => {
  try {
    const devis = await Devis.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!devis) return res.status(404).json({ msg: "Devis non trouvé" });
    let response;
    if (req.role === "admin") {
      response = await Devis.findOne({
        attributes: [
          "uuid",
          "nom",
          "prenom",
          "email",
          "societe",
          "produit",
          "tel",
          "pays",
          "message",
        ],
        where: {
          id: devis.id,
        },
      });
    } else {
      return res.json({ msg: "Accès interdit" });
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ msg: err.msg });
  }
};
export const createDevis = async (req, res) => {
  const { nom, prenom, email, societe, produit, tel, pays, message } = req.body;
  try {
    await Devis.create({
      nom: nom,
      prenom: prenom,
      email: email,
      societe: societe,
      produit: produit,
      tel: tel,
      pays: pays,
      message: message,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Devis Created Successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.msg });
  }
};
export const deleteDevis = async (req, res) => {
  try {
    const devis = await Devis.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!devis) return res.status(404).json({ msg: "Devis non trouvé" });
    const { nom, prenom, email, societe, produit, tel, pays, message } =
      req.body;
    if (req.role === "admin") {
      await Devis.destroy({
        where: {
          id: devis.id,
        },
      });
    } else {
      return res.json({ msg: "Accès interdit" });
    }
    res.status(200).json({
      msg: "Devis delete successfuly",
    });
  } catch (err) {
    res.status(500).json({ msg: err.msg });
  }
};
