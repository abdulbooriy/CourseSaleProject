import Course from "../models/course.model.js"
import CourseCategory from "../models/courseCategory.model.js"
import { courseValidation } from "../validations/course.validation.js"
import User from "./users.model.js"

async function getAll(req, res) {
    try {
        let courses = await Course.findAll({ include: [{ model: CourseCategory }, { model: User }] })
        if (!courses) {
            res.status(400).send({ msg: "Not found!!!" })
        }
        res.status(200).send({ data: courses })
    } catch (error) {
        res.status(400).send({ mgs: error.message })
    }
}

async function getOne(req, res) {
    try {
        let { id } = req.params
        let course = await Course.findByPk(id, { include: [{ model: CourseCategory }, { model: User }] })
        if (!course) {
            res.status(400).send({ msg: "Not found!!!" })
        }
        res.status(200).send({ data: course })
    } catch (error) {
        res.status(400).send({ mgs: error.message })
    }
}

async function getBySearch(req, res) {
    try {
        let query = req.query
        let keys = Object.keys(query)
        let values = Object.values(query)

        let newQuery = {}

        values.forEach((val, index) => {
            if (val) {  
                newQuery[keys[index]] = val
            }
        })
        let courses = await Course.findAll({ where: newQuery, include: [{ model: CourseCategory }, { model: User }] })
        if (!courses) {
            res.status(400).send({ msg: "Not found!!!" })
        }
        res.status(200).send({ data: courses })
    } catch (error) {
        res.status(400).send({ mgs: error.message })
    }
}


async function create(req, res) {
    try {
        let body = req.body
        let { error } = courseValidation(body)
        if (error) {
            res.status(400).send(error.details[0].message)
        }
        const uploadPath = `./uploads/${req.file.filename}`;
        let course = await Course.create({...body, image: uploadPath})
        res.status(200).send({ data: course })
    } catch (error) {
        res.status(400).send({ mgs: error.message })
    }
}

async function update(req, res) {
    try {
        let body = req.body
        await Course.update(body, { where: { id } })
        res.status(200).send({ msg: "Successfully updated!!!" })
    } catch (error) {
        res.status(400).send({ mgs: error.message })
    }
}

async function remove(req, res) {
    try {
        let { id } = req.params
        await Course.destroy(id)
        res.status(200).send({ msg: "Successfully deleted!!!" })
    } catch (error) {
        res.status(400).send({ mgs: error.message })
    }
}

export { getAll, getOne, create, update, remove, getBySearch }
