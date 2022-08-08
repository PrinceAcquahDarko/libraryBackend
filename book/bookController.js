import bookModel from './bookModel.js'
import {v2} from '../utility/files.js';


const createBook = async (req, res) => {
    let data = { ...req.body };

    try {
        let cloudi = v2()
        let responds = await cloudi.uploader.upload(req.file.path, {resource_type:"auto"})
        data.link = responds.secure_url

        let book = new bookModel(data);
        const uploadedBook = await book.save();
        return res
        .status(200)
        .json({ message: "created successfully", uploadedBook});

    } catch (error) {
        return res
        .status(500)
        .json({ message: "could not create Book"});
    }
}

const updateBook = async (req, res) => {

    const filter = {_id: req.query.bookId};
    if(req.file){
        let cloudi = v2()
        res = await cloudi.uploader.upload(req.file.path, {resource_type:"auto"})
        req.body.link = res.secure_url
    }
    const update = req.body


    try {
        const updatedBook = await bookModel.findOneAndUpdate(filter, update, {new: true})
        return res
        .status(200)
        .send({ message: 'updated successfully', updatedBook});

    } catch (error) {
         return res
        .status(500)
        .json({ message: "could not update Book"});
    }
}

const getAllBooks = async (req, res) => {
    try {
        let allBooks = await bookModel.find({})
        return res
        .status(200)
        .json({"message":"success", allBooks})

    } catch (error) {
         return res
        .status(500)
        .json({ message: "could not get Books"});
    }
}

const getBookById = async(req, res) => {
    try {
        let book = await bookModel.find({_id: req.query.bookId})
        return res
        .status(200)
        .json({"message":"success", book})

    } catch (error) {
         return res
        .status(500)
        .json({ message: "could not get Book"});
    }
}


const deleteBook = async (req, res) => {
    try {
        await bookModel.findByIdAndDelete({_id: req.query.bookId})
        return res
        .status(200)
        .json({"message":"deleted successfully"});

    } catch (error) {
        return res
        .status(500)
        .json({ message: "could not delete Book"});
    }
}


export {
    getAllBooks,
    getBookById,
    updateBook,
    createBook,
    deleteBook
}