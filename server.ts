import express from 'express'
import { Application } from 'express-serve-static-core';
import dotenv from 'dotenv';
import beeperRouter from './routs/beeperRouter.js'

dotenv.config();
const app:Application = express();

app.use(express.json())
app.use('/beepers', beeperRouter )

app.listen(process.env.PORT , ()=>{
    console.log(`server listening `)
})