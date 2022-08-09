import registerModel from './userModel.js'
import {
    validateInputs,
    jwts, 
    comparePassword,
    hashPassword
} from '../utility/utility.js'

const registerUser = async(req, res) => {
    let data = {...req.body}
    
    let validData = validateInputs(data);
    if (validData.error) return res.status(300).send({ message:validData.error?.details[0].message})


    try {
        let loginUser = await registerModel.findOne({
            email: data.email,
        });

        if (loginUser) return res.status(404).send({ message:"user already exists"});
        if(req.query.admin){
            data.admin = true
        }

        data.password = hashPassword(data.password);
        
        let user = new registerModel(data);
        let registeredUser = await user.save();
        let token = jwts(registeredUser._id);

        const load = payload(token, registeredUser)
        return res
        .status(200)
        .json({ message: "registered successfully", load });

    } catch (error) {
        return res
        .status(500)
        .json({ message: "could not register User"});
    }
    
}

const updateUser = async (req, res) => {
    const filter = {_id: req.query.id};
    const update = req.body

    if(update.password){
        update.password = hashpassword(update.password);
    }

    try {
        await registerModel.findOneAndUpdate(filter, update, {new: true})
        return res
        .status(200)
        .send({ message: 'updated successfully'});

    } catch (error) {
         return res
        .status(500)
        .json({ message: "could not update Book"});
    }
}

const getUser = async (req, res) => {

    try {
        let loginUser = await registerModel.findOne({
            _id: req.query.id,
        });
        return res
        .status(200)
        .send({ message: 'user found '});

    } catch (error) {
         return res
        .status(500)
        .json({ message: "could not find user"});
    }
}

const loginUser = async (req, res) => {
    try {
        let loginUser = await registerModel.findOne({
            email: req.body.email,
        });

        if (!loginUser) return res.status(404).send({ message:"No such user"});
       
        let validPassword = await comparePassword(req.body.password, loginUser.password);
    
        if (!validPassword) return res.status(402).send({ message:"passwords dont much"});
    
        let token = jwts(loginUser._id);

        const load = payload(token, loginUser)
        console.log(load)

        return res
        .status(200)
        .json({ message: "loggedIn successfully", load });

    } catch (error) {
        return res
        .status(500)
        .json({ message: "could not log in User"});
    }
}



const payload =  (token, data) => {
    return {
        token: token,
        firstname: data.firstname,
        lastname: data.lastname,
        admin: data.admin
    }
}




export {
    registerUser, 
    updateUser, 
    loginUser,
    getUser 
}