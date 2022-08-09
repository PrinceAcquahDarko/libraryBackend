import mongoose from 'mongoose';
const {Schema} = mongoose

const tokenIssue = new Schema({
        token: {type: String, required: true},
        userId: {
            type: Schema.Types.ObjectId, ref:'LibUsers'
        },
        createdAt:{
            type:Date,
            default: Date.now,
            expires: 600
        }
        


})


export default mongoose.model('tokenIssueing', tokenIssue)