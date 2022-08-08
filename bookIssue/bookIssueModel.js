import mongoose from 'mongoose';
const {Schema} = mongoose

const bookIssue = new Schema({
        returned: {type: Boolean, required: false, default:false},
        complains: {type: String, required: false},
        book: {
            type: Schema.Types.ObjectId, ref:'LibBooks', required:true
        },
        user: {
            type: Schema.Types.ObjectId, ref:'LibUsers', required: true
        }


})


export default mongoose.model('LibIssueing', bookIssue)