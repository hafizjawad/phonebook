import express, { Request, Response } from "express";
import { phonebook } from "../../entity/phonebook";
const router = express.Router();
import {myDb} from "../../index";
const fs = require('fs');


router.post("/", async (req: Request, res: Response) => {
      const { name, phoneno, postImage} = req.body;
      //@ts-ignore
      const id = req.body.user;
      const path = './public/uploads/'+Date.now()+'.png'
      const base64Data = postImage.image.toString().replace(/^data:([A-Za-z-+/]+);base64,/, '');
      fs.writeFileSync(path, base64Data,  {encoding: 'base64'});
      const pathForDb = path.replace('./public/','/');
      console.log("path", pathForDb);
    
    myDb.getRepository(phonebook).insert({
        name: name,
        phoneno: phoneno,
        userId: id,
        image: pathForDb
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