import express from "express";
const cors = require('cors');

const loginRoute = require('./Routes/User/loginRoute');
const registerRoute = require('./Routes/User/registerRoute');
const getDataRoute = require("./Routes/User/getDataRoute");
const addNumberRoute = require("./Routes/phonebook/addNumberRoute")
const deleteRoute = require("./Routes/phonebook/deleteRoute");
const getPhoneRoute = require("./Routes/phonebook/getPhoneRoute");
const updateRoute = require("./Routes/phonebook/updateRoute");

import { db } from "./database";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());


const db1 = new db();
export const myDb = db1.dbCon();

app.listen(8000, () => {
  console.log("Server is running on port no 8000");
});

app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/api/get", getDataRoute);
app.use("/api/post", addNumberRoute);
app.use("/api/delete", deleteRoute);
app.use("/api/getphone", getPhoneRoute);
app.use("/api/update", updateRoute);