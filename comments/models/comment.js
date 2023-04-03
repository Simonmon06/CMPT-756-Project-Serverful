const mongoose = require('mongoose')
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema
const commentSchema = new Schema ({

    content:{
        type: String,
        required: 'Content is required'
    },
    postId: {
        type: String,
        required: true,
    },
    
}, {timestamps: true})

module.exports= mongoose.model('Model', commentSchema)