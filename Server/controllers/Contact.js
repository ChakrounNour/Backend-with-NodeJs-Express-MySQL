import { Op } from "sequelize";
import Users from "../models/UserModel.js";
import Contact from "../models/ContactModel.js";

export const getContact = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Contact.findAll({
        attributes: ["uuid", "nomP", "email", "sujet", "tel", "message"],
      });
    } else {
      return res.json({ msg: "Accès interdit" });
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ msg: err.msg });
  }
};
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!contact) return res.status(404).json({ msg: "Contact non trouvé" });
    let response;
    if (req.role === "admin") {
      response = await Contact.findOne({
        attributes: ["uuid", "nomP", "email", "sujet", "tel", "message"],
        where: {
          id: contact.id,
        },
      });
    } else {
      response = await Contact.findOne({
        attributes: ["uuid", "nomP", "email", "sujet", "tel", "message"],
        where: {
          [Op.and]: [{ id: contact.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ msg: err.msg });
  }
};
export const createContact = async (req, res) => {
  const { nomP, email, sujet, tel, message } = req.body;
  try {
    await Contact.create({
      nomP: nomP,
      email: email,
      sujet: sujet,
      tel: tel,
      message: message,
    });
    res.status(201).json({ msg: "Contact Created Successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.msg });
  }
};
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!contact) return res.status(404).json({ msg: "Contact non trouvé" });
    const { nomP, email, sujet, tel, message } = req.body;
    if (req.role === "admin") {
      await Contact.destroy({
        where: {
          id: contact.id,
        },
      });
    } else {
      return res.json({ msg: "Accès interdit" });
    }
    res.status(200).json({
      msg: "Contact delete successfuly",
    });
  } catch (err) {
    res.status(500).json({ msg: err.msg });
  }
};
