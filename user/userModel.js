import mongoose from 'mongoose';
const {Schema} = mongoose

const libraryUsers = new Schema({
        firstname: {type: String, required: true},
        lastname: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        admin: {type:Boolean, required: true, default: false}

})


export default mongoose.model('LibUsers', libraryUsers)