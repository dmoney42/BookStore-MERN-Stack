import express from "express";
import { mongoDBURL, PORT } from "./config.js"; //importing port variable from config.
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js';

const app = express();
 
app.use(express.json());

app.get('/',(request,response)=>{
    console.log(request)
    return response.status(500).send('Example internal server error message')
});

app.use('/books', booksRoute);

mongoose.connect(mongoDBURL)
.then(()=>{
    console.log('App connected to database');

    app.listen(PORT, ()=> {
        console.log(`App is listening to port ${PORT}`);
    });
})
.catch((error)=>{
    console.log(error);
})