import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === "true" ? true : false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    },
} as nodemailer.TransportOptions)

export const sendEmail =  async function (to:string,subject:string,body:string){


    return new Promise((resolve,reject)=>{
        transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to,
            subject,
            html: body
        },(error,info)=>{
            if(error){
                reject(error);
            }else{
                resolve(info);
            }
        })
    })
}