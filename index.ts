import express from "express";
const cors = require('cors');
const bodyParser = require('body-parser');
const loginRoute = require('./Routes/User/loginRoute');
const registerRoute = require('./Routes/User/registerRoute');
const getDataRoute = require("./Routes/User/getDataRoute");
const addNumberRoute = require("./Routes/phonebook/addNumberRoute")
const deleteRoute = require("./Routes/phonebook/deleteRoute");
const getPhoneRoute = require("./Routes/phonebook/getPhoneRoute");
const updateRoute = require("./Routes/phonebook/updateRoute");
const getUserRoute = require("./Routes/User/getUserRoute")

const {checkUserAuth} = require ("./jwt/JWT");


import { db } from "./database";

const app = express();
app.use(cors());
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));

app.use(express.static(__dirname + '/public'));

const db1 = new db();
export const myDb = db1.dbCon();

app.listen(8000, () => {
  console.log("Server is running on port no 8000");
});

app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/api/get",checkUserAuth, getDataRoute);
app.use("/api/getuser",checkUserAuth, getUserRoute);
app.use("/api/post",checkUserAuth, addNumberRoute);
app.use("/api/delete",checkUserAuth, deleteRoute);
app.use("/api/getphone", checkUserAuth, getPhoneRoute);
app.use("/api/update", checkUserAuth, updateRoute);