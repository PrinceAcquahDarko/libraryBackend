import express from 'express';
import {
    loginUser, 
    registerUser, 
    updateUser,
    getUser
} from './userController.js';

import {getUserId} from '../utility/authorization.js'

let UserRouter = express.Router()


function Router(){
    UserRouter.route('/register')
        .post(registerUser)

    UserRouter.route('/login')
        .post(loginUser)
    

    UserRouter.route('/updateUser')
        .put(getUserId, updateUser)
    
    UserRouter.route('/getUser')
        .get(getUserId, getUser)



    return UserRouter
}


export default Router()