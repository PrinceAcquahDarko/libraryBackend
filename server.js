import express from "express";
const app = express();

import cors from 'cors';
import UserRouter from './user/userRoute.js';
import BookRouter from './book/bookRoute.js';
import issueRouter from './bookIssue/bookIssueRoute.js';
import tokenRouter from './password-reset/token.route.js';

app.use(express.json())
app.use(cors())


app.use('/api/v1/user', UserRouter)
app.use('/api/v1/book', BookRouter)
app.use('/api/v1/issue', issueRouter)
app.use('/api/v1/token', tokenRouter)


export {app}