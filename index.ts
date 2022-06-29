import express, { Request, Response } from "express";
import { DataSource } from "typeorm";
const cors = require('cors');
import { user } from "./entity/user";
import { phonebook } from "./entity/phonebook";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());


export const myDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "password",
  database: "phonebook",
  synchronize: true,
  entities: ['./entity/*.ts'],
 
});

const userRepo = myDataSource.getRepository(user);
const phonebookRepo = myDataSource.getRepository(phonebook);

myDataSource
  .initialize()
  .then(() => {
    console.log("Database Connected Successfully..!!");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(8000, () => {
  console.log("Server is running on port no 8000");
});
