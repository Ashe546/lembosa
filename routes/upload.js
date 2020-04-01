const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const File = require("../module/uploads")
const uploadPath = path.join('public', File.coverImageBasePath)
const imageMimeType = ['image/jpeg', 'image/png', 'image/gif']
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeType.includes(file.mimetype))
    }
})
router.get ('/', async function(req, res){
    try {
        const files = await File.find({})
        res.render('index', {files: files})
    } catch {
        res.redirect('/new')
    }

})

//new
router.get ('/new', async function(req, res){
    try {
        const file = new File()
        res.render('new', {
            file: file
        })
    } catch  {
        res.redirect('/')
    }

})

//create
router.post('/', upload.single('cover'), async (req, res) => {
    const fileName = req.file != null ? req.file.filename : null
    const file = new File({
        coverImageName: fileName,
        image: req.body.image
       })
   
    try {
        const newFile = await file.save()
        res.redirect('/')
    } catch{
        res.render('new')
    }

})
module.exports = router