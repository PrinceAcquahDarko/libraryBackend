import express from 'express';
import {
    resetPassword, 
    sendToken, 
    validate_token
} from './token.controller.js'

let tokenRouter = express.Router()


function Router(){
    tokenRouter.route('/')
        .post(sendToken)

    tokenRouter.route('/validate')
        .post(validate_token)
    
    tokenRouter.route('/change-password')
        .put(resetPassword)

    return tokenRouter
}

console.log()
export default Router()