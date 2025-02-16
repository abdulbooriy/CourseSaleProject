import multer from "multer";
import path from "path"

let storage = multer.diskStorage({
    filename: (req, res, cb) => {
        cb(null, `${Date.now()}.${path.extname(file.originalName)}`)
    },
    destinatiom: (req, res, cb) => {
        cb(null, "./uploads")
    }
})

export let upload = multer({storage})
