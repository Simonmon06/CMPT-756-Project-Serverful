const mongoose = require('mongoose')
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema
const postSchema = new Schema ({
    title:{
        type: String,
        required: 'Title is required'
    }
}, {timestamps: true})

module.exports= mongoose.model('Model', postSchema)