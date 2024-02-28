import { Worker } from "bullmq";
import { sendEmail } from "../email/send.email";


const queueConfig = {
    connection:{
        host: process.env.REDIS_QUEUE_HOST,
        port: Number(process.env.REDIS_QUEUE_PORT),
        username: process.env.REDIS_QUEUE_USERNAME,
        password: process.env.REDIS_QUEUE_PASSWORD,
    },
    limiter:{
        max: 1,
        duration:1 * 1000
    }
}

async function processEmailQueue(job:any){
    
    try {
       
        const data = job.data;
        await sendEmail(data.to,data.subject,data.body);
        console.log("email job completed ",job.id);
    } catch (error) {
        throw error;
    }

}

export const emailQueue = new Worker("notification-email",processEmailQueue,queueConfig);


