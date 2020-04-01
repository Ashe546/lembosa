const mongoose = require('mongoose')
const path = require('path')
const coverImageBasePath = 'uploads/bookCovers'
const fileSchema = new mongoose.Schema({

    coverImageName: {
        type: Object,
        required: true
    },
      image: String,
})

fileSchema.virtual('coverImagePath').get(function(){
    if(this.coverImageName != null)
    return path.join('/' , coverImageBasePath, this.coverImageName)
})


module.exports = mongoose.model('File', fileSchema)
module.exports.coverImageBasePath = coverImageBasePath