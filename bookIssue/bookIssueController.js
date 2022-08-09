import bookIssueModel from './bookIssueModel.js'

const issueAbook = async (req, res) => {
    try {
        // await bookIssueModel.collection.drop()
        const filter = {book: req.query.bookId, user:req.query.id};
        const bk = await bookIssueModel.findOne(filter)
        if(bk){
            
            return res
            .status(400)
            .json({ message: "book issued already" });
        }

        let getBook = new bookIssueModel({
            book : req.query.bookId,
            user : req.query.id
        })

        await getBook.save();

        return res
        .status(200)
        .json({ message: "issued successfully" });

    } catch (error) {
        console.log(error)
         return res
        .status(500)
        .json({ message: "could not issue Book"});
    }
}

const makeComplain = async(req, res) => {
    const filter = {book: req.query.bookId, user:req.query.id};
    const update = {complains: req.body.complain}

    try {
        await bookIssueModel.findOneAndUpdate(filter, update, {new: true})
        return res
        .status(200)
        .send({ message: 'successfully'});

    } catch (error) {
         return res
        .status(500)
        .json({ message: "could not make a complain"});
    }

}

const returnBook = async (req, res) => {

    const filter = {book: req.query.bookId, user:req.query.id};
    const update = {returned: req.body.returned}
    console.log(req.body)

    try {
        await bookIssueModel.findOneAndUpdate(filter, update, {new: true})
        return res
        .status(200)
        .send({ message: 'successfully'});

    } catch (error) {
         return res
        .status(500)
        .json({ message: "could not return book"});
    }
}

const getAllIssuedBooks = async (req, res) => {
    try {
        let books = await bookIssueModel.find({user: req.query.id}).populate('book')
        return res
        .status(200)
        .send({ message: 'success', books});

    } catch (error) {
         return res
        .status(500)
        .json({ message: "could not get issued books"});
    }
}

const adminBooks = async (req, res) => {
    try {
        let books = await bookIssueModel.find().populate('book','user')
        return res
        .status(200)
        .send({ message: 'success', books});

    } catch (error) {
         return res
        .status(500)
        .json({ message: "could not get issued books"});
    }
}



export {
    issueAbook,
    makeComplain,
    returnBook,
    getAllIssuedBooks,
    adminBooks
}