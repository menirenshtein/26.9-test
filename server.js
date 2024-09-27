import express from 'express';
import dotenv from 'dotenv';
import beeperRouter from './routs/beeperRouter.js';
dotenv.config();
const app = express();
app.use(express.json());
app.use('/api', beeperRouter);
app.listen(process.env.PORT, () => {
    console.log(`server listening `);
});
