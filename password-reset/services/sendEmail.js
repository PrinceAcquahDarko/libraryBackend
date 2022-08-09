import nodemailer from 'nodemailer'
import {google} from 'googleapis';
import dotenv from "dotenv";

dotenv.config(); 

const clientId = process.env.CLIENTID;
const clientSecret = process.env.CLIENTSECRET;
const refreshToken = process.env.REFRESHTOKEN;

const OAuth2 = google.auth.OAuth2
const OAuth2_client = new OAuth2(clientId, clientSecret);

OAuth2_client.setCredentials({refresh_token: refreshToken});


const send_mail = async (recipient, name, token) => {
    const accessToken = OAuth2_client.getAccessToken();

    const transport = nodemailer.createTransport({
        service:'gmail',
        auth:{
            type: 'OAuth2',
            user: 'padarko99@gmail.com',
            clientId,
            clientSecret,
            refreshToken,
            accessToken
        }
    })

    const mail_options = {
        from : `azLibrary`,
        to: recipient,
        subject:`Password reset`,
        html: get_html_message(name, token)
    }
    try {
        await transport.sendMail(mail_options)
        transport.close();
    } catch (error) {
        throw error
    }
}

const get_html_message = (name, token) => {
    return `
        <p>Dear ${name}</p>
        <p>There was recently a request to change the password for your azLibrary account </p>

        <p> if you requested this password change, please complete the process by using the code 
            below to reset your password </p>

        <h3>  ${token}</h3>

        <h3>PLEASE NOTE</h3>

        <ul>
            <li>This password reset code is only valid for the next 10 minutes</li>
            <li>If you did not make this request, you can 
                ignore this message and your 
                password will remain the same 
            </li>
       </ul>

        <span>Best Regards</span>
        <span><strong>The azLibrary Team </span></div>
    `
}

export {send_mail}

