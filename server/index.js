import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import uploadRoute from './routes/file_upload.routes.js';
import userRoute from './routes/user.routes.js';
import * as dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({limit : '50mb'}));
app.use("/files",express.static('files'))

mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("DB connected"))
.catch((err)=>console.error(err))

app.get('/',(req,res)=>{
    res.send({message:"Connected!!"})
})

app.use('/uploadFiles',uploadRoute);

app.use('/users',userRoute)

app.listen(3000,()=>{
    console.log("Server started at port : 3000");
})