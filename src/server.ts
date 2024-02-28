import dotenv from 'dotenv';
dotenv.config({path:'./.env'});


import { emailQueue } from './queues/email.queue';


emailQueue
  .on('completed', (job, result) => {
    console.log(`Email job ${job.id} completed with result:`, result);
  })
  .on('failed', (job, err) => {
    console.error(`Email job ${job?.id} failed with error:`, err);
  });

// Ensure proper error handling for the worker
emailQueue.on('error', (error) => {
  console.error('BullMQ worker error:', error);
});
