import Course from "../models/course.model.js";
import Lessons from "../models/lessons.model.js";
import LessonsValidation from "../validations/lessons.validation.js";

export const findAll = async (req, res) => {
  try {
    const lessons = await Lessons.findAll({ include: { model: { Course } } });
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const findOne = async (req, res) => {
  try {
    const lesson = await Lessons.findByPk(req.params.id, {
      include: { model: { Course } },
    });
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });
    res.status(200).json(lesson);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const create = async (req, res) => {
  const { error } = LessonsValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const newLesson = await Lessons.create(req.body);
    res.status(201).json(newLesson);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const update = async (req, res) => {
  const { error } = LessonsValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const [updated] = await Lessons.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updated) return res.status(404).json({ message: "Lesson not found" });

    const updatedLesson = await Lessons.findByPk(req.params.id);
    res.status(200).json(updatedLesson);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const remove = async (req, res) => {
  try {
    const deleted = await Lessons.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) return res.status(404).json({ message: "Lesson not found" });

    res.status(200).json({ message: "Lesson deleted successfully" });
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

    let lessons = await Lessons.findAll({ where: newQuery });
    if (!lessons || lessons.length === 0) {
      return res.status(404).send({ msg: "No lessons found!" });
    }

    res.status(200).send({ data: lessons });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
}
