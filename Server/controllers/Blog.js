import { Op } from "sequelize";
import Users from "../models/UserModel.js";
import Blog from "../models/BlogModel.js";

export const getBlogs = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Blog.findAll({
        attributes: ["uuid", "title", "description", "date", "image"],
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Blog.findAll({
        attributes: ["uuid", "title", "description", "date", "image"],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ msg: err.msg });
  }
};

export const getBlogsById = async (req, res) => {
  try {
    const blogs = await Blog.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!blogs) return res.status(404).json({ msg: "Blogs non trouvé" });
    let response;
    if (req.role === "admin") {
      response = await Blog.findOne({
        attributes: ["uuid", "title", "description", "date", "image"],
        where: {
          id: blogs.id,
        },
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Blog.findOne({
        attributes: ["uuid", "title", "description", "date", "image"],
        where: {
          [Op.and]: [{ id: blogs.id }, { userId: req.userId }],
        },
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ msg: err.msg });
  }
};
export const createBlogs = async (req, res) => {
  const { title, description, date } = req.body;
  const image = req.file ? req.file.path : null; 
  try {
    await Blog.create({
      title: title,
      description: description,
      date: date,
      userId: req.userId,
      image: image,
    });
    res.status(201).json({ msg: "Blog Created Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const updateBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!blogs) return res.status(404).json({ msg: "Blog not found" });
    const { title, description } = req.body;
    const image = req.file ? req.file.path : blogs.image; // Utilisez req.file pour obtenir l'image téléchargée
    if (req.role === "admin") {
      await Blog.update(
        { title, description, image },
        {
          where: {
            id: blogs.id,
          },
        }
      );
    } else {
      if (req.userId !== blogs.userId)
        return res.status(403).json({ msg: "Access forbidden" });
      await Blog.update(
        { title, description, image },
        {
          where: {
            [Op.and]: [{ id: blogs.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({
      msg: "Blog updated successfully",
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const deleteBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!blogs) return res.status(404).json({ msg: "Blog non trouvé" });
    if (req.role === "admin") {
      await Blog.destroy({
        where: {
          id: blogs.id,
        },
      });
    } else {
      if (req.userId !== blogs.userId)
        return res.status(403).json({ msg: "Accès interdit" });
      await Blog.destroy({
        where: {
          [Op.and]: [{ id: blogs.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({
      msg: "Blog delete successfuly",
    });
  } catch (err) {
    res.status(500).json({ msg: err.msg });
  }
};
