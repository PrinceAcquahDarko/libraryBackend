import express from 'express';
import {
    createBook,
    deleteBook,
    getAllBooks,
    getBookById,
    updateBook
} from './bookController.js';
import {picUpload} from '../utility/files.js'

let BookRouter = express.Router()
const upload = picUpload();

function Router(){
    BookRouter.route('/')
        .get(getAllBooks)
        .post(upload.single('Image'),createBook)
    
    BookRouter.route('/id')
        .get(getBookById)
        .put(updateBook)
        .delete(deleteBook)
    

    return BookRouter
}


export default Router()
