import express from "express";
const app = express();

import cors from 'cors';
import UserRouter from './user/userRoute.js';
import BookRouter from './book/bookRoute.js';
import issueRouter from './bookIssue/bookIssueRoute.js';
import tokenRouter from './password-reset/token.route.js';

app.use(express.json())
app.use(cors())


app.use('/user', UserRouter)
app.use('/book', BookRouter)
app.use('/issue', issueRouter)
app.use('/token', tokenRouter)


export {app}