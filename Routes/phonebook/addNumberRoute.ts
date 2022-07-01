import express, { Request, Response } from "express";
import { phonebook } from "../../entity/phonebook";
const router = express.Router();
import {myDb} from "../../index";

router.post("/", async (req: Request, res: Response) => {
    const { id, name, phoneno } = req.body;
    let id1 = parseInt(id);
    console.log("name & phoneno from post", id, name, phoneno);
    let find =  await myDb.getRepository(phonebook).findOne({
      where: {
        phoneno: phoneno
      }
    })
    myDb.getRepository(phonebook).insert({
        name: name,
        phoneno: phoneno,
        userId: id,
    }).then(() => {
      res.send({ message: "Successfully Registered"});
      console.log("Data Inserted Successfully..!!")
    }).catch((err)=> {
      res.send(err);
      console.log("Data not insrted..!!")
    }
  )}
  );

  module.exports = router;