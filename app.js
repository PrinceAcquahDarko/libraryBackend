import {app} from "./server.js";
import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config(); 

const url = process.env.URL ||  'mongodb://localhost/library'
const PORT = process.env.PORT || 3000

mongoose.connect(url).then((data) => {
    console.log('we connected to database')
})

app.listen(PORT, function(){
    console.log('server started')
})