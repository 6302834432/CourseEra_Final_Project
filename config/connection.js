import dotenv from "dotenv";
import {mongoose} from 'mongoose'

dotenv.config();

export const connectDB=()=>{
    mongoose.connect(process.env.DTABASEURI).then(()=>{
        console .log("connect to db ")
    }).catch(err=>console.log(err))
}