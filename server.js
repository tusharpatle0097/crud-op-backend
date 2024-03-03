const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const user = require("./models/userModel");
dotenv.config();

const cors = require("cors");
app.use(cors());

const userRouter = require('./routes/userRoutes');

app.use(express.json());

mongoose.connect(process.env.URL)
    .then(() => {
        console.log('connected successfully');
        app.listen(process.env.PORT || 8000, (err) => {
            if (err) console.log(err);
            console.log("running successfully at", process.env.PORT);
        });
    })
    .catch((err) => {
        console.log(err, "err");
    });

app.use(userRouter);
