import CourseCategory from "../models/courseCategory.model.js"
import { courseCategoryValidation } from "../validations/courseCategory.validation.js"

async function getAll(req, res) {
    try {
        let categories = await CourseCategory.findAll();
        if (!categories) {
            res.status(400).send({ msg: "Not found!!!" })
        }
        res.status(200).send({ data: categories })
    } catch (error) {
        res.status(400).send({ mgs: error.message })
    }
}

async function getOne(req, res) {
    try {
        let { id } = req.params
        let category = await CourseCategory.findByPk(id)
        if (!category) {
            res.status(400).send({ msg: "Not found!!!" })
        }
        res.status(200).send({ data: category })
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
        let categories = await CourseCategory.findAll({ where: newQuery})
        if (!categories) {
            res.status(400).send({ msg: "Not found!!!" })
        }
        res.status(200).send({ data: categories })
    } catch (error) {
        res.status(400).send({ mgs: error.message })
    }
}



async function create(req, res) {
    try {
        let body = req.body
        let { error } = courseCategoryValidation(body)
        if (error) {
            res.status(400).send(error.details[0].message)
        }
        const uploadPath = `./uploads/${req.file.filename}`;
        let category = await CourseCategory.create({...body, image: uploadPath})
        res.status(200).send({ data: category })
    } catch (error) {
        res.status(400).send({ mgs: error.message })
    }
}

async function update(req, res) {
    try {
        let body = req.body
        await CourseCategory.update(body, { where: { id } })
        res.status(200).send({ msg: "Successfully updated!!!" })
    } catch (error) {
        res.status(400).send({ mgs: error.message })
    }
}

async function remove(req, res) {
    try {
        let { id } = req.params
        await CourseCategory.destroy(id)
        res.status(200).send({ msg: "Successfully deleted!!!" })
    } catch (error) {
        res.status(400).send({ mgs: error.message })
    }
}

export { getAll, getOne, create, update, remove, getBySearch }