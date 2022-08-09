import joi from "joi";
import TokenSchema from './token.model.js'
import UserSchema from '../user/userModel.js'
import {send_mail} from './services/sendEmail.js';
import {generateToken} from './services/generate_token.js'
import {hashPassword} from '../utility/utility.js'
import tokenModel from "./token.model.js";


const sendToken = async (req, res) => {

    const schema = joi.object({email:joi.string().email().required()})
    const {error} = schema.validate(req.body)

    if (error) return res.status(400).send(error.details[0].message)

    
    try {
        const user = await UserSchema.findOne({email: req.body.email})
        if(!user) return res.status(400).send("email doesnt exist")

        let token = await TokenSchema.findOne({userId:user.id})

        if(token){
            await send_mail(req.body.email, user.firstname, token.token)

            return res
                .status(200)
                .json({ message: "email sent successfully" });
        }

        token = await new TokenSchema({
            userId: user._id,
            token: generateToken()

        }).save()

        await send_mail(req.body.email, user.firstname, token.token)

        return res
        .status(200)
        .json({ message: "email sent successfully" });

    } catch (error) {
         return res
        .status(500)
        .json({ message: "could not send email"});
    }
}

const validate_token = async (req, res) => {

    try {
        const user = await UserSchema.findOne({email: req.query.email})
        if(!user) return res.status(400).send("email doesnt exist")
    
        const token = await tokenModel.findOne({
            userId: user.id,
            token: req.body.token
        })
        if(!token) return res.status(500).send("invalid link or expired");

        await token.delete()
        return res
        .status(200).json({message: "token valid"})

    } catch (error) {
        return res
        .status(500)
        .json({ message: "could not update password"});
    }
  

}

const resetPassword = async (req, res) => {
    const schema = joi.object({password:joi.string().required()})
    const {error} = schema.validate(req.body);

    if(error) return res.status(400).send(error.details[0].message)
    try {
        const user = await UserSchema.findOne({email: req.query.email})
        if(!user) return res.status(400).send("email doesnt exist")
    
        user.password = hashPassword(req.body.password)
        await user.save();
        return res
        .status(200).json({message: "passwords changed successfully"})

    } catch (error) {
        return res
        .status(500)
        .json({ message: "could not update password"});
    }
  
    
}

export {sendToken, resetPassword, validate_token}