import mongoose from 'mongoose';
const {Schema} = mongoose

const bookModel = new Schema({
        title: {type: String, required: true},
        author: {type: String, required: true},
        link: {type: String, required: true},
        category: {type: String, required: true},


})


export default mongoose.model('LibBooks', bookModel)