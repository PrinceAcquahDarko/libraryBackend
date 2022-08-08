import express from 'express';
import {getUserId} from '../utility/authorization.js'
import {
    issueAbook,
    makeComplain,
    returnBook,
    getAllIssuedBooks,
    adminBooks
} from './bookIssueController.js';

let issueRouter = express.Router()


function Router(){
    issueRouter.route('/book')
        .get(getUserId, issueAbook)

    issueRouter.route('/allbooks')
        .get(getUserId, getAllIssuedBooks)

    issueRouter.route('/complain')
        .put(getUserId, makeComplain)
    
    issueRouter.route('/returnbook')
        .put(getUserId, returnBook)

    issueRouter.route('/admin')
        .get(getUserId, adminBooks)

    return issueRouter
}


export default Router()