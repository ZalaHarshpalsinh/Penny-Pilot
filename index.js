import mongoose from "mongoose";
import express from 'express';
import {App} from "./app.js"

mongoose.connect("mongodb://localhost/Penny-Pilot")
        .then(()=>console.log("Connected to Database"))
        .catch((err)=>console.log(`Error :${err}`));

const app=App();

const PORT=process.env.PORT || 4000;

app.listen(PORT,()=>{
  console.log(`Running on port ${PORT}`);
})


// import 'dotenv/config'

// import connectDB from "./db/mongodb.js"
// import app from "./app.js"

// connectDB()
//     .then( () =>
//     {
//         app.listen( process.env.PORT || 8000, () =>
//         {
//             console.log( `Server is running at port : ${process.env.APPLICATION_PORT}` );
//         } )
//     } )
//     .catch( ( err ) =>
//     {
//         console.log( "Application error: Database connection failed !!! \n" );
//         process.exit( 1 );
//     } )