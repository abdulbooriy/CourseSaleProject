import { Op } from "sequelize";
import Comments from "../models/comments.model.js";
import Users from "../models/users.model.js";
import CommentsValidation from "../validations/comments.validation.js";
import Course from "../models/course.model.js";

export const findAll = async (req, res) => {
  try {
    const comments = await Comments.findAll({
      include: [{ model: Course }, { model: Users }],
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const findOne = async (req, res) => {
  try {
    const comment = await Comments.findByPk(req.params.id, {
      include: [{ model: Course }, { model: Users }],
    });
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const create = async (req, res) => {
  const { error } = CommentsValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const newComment = await Comments.create(req.body);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const update = async (req, res) => {
  const { error } = CommentsValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const [updated] = await Comments.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updated) return res.status(404).json({ message: "Comment not found" });

    const updatedComment = await Comments.findByPk(req.params.id);
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const remove = async (req, res) => {
  try {
    const deleted = await Comments.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) return res.status(404).json({ message: "Comment not found" });

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export async function findBySearch(req, res) {
  try {
    let query = req.query;
    let keys = Object.keys(query);
    let values = Object.values(query);

    let newQuery = {};
    values.forEach((val, index) => {
      if (val) {
        newQuery[keys[index]] = val;
      }
    });

    let comments = await Comments.findAll({ where: newQuery });
    if (!comments || comments.length === 0) {
      return res.status(404).send({ msg: "No comments found!" });
    }

    res.status(200).send({ data: comments });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
}
