import { Request, Response } from "express";
import { user } from "../../entity/user"
import {myDb} from "../../index";
const fs = require('fs');

const express = require('express')
const router = express.Router();
 

router.post("/", async (req: Request, res: Response) =>{
  console.log("hello from register");
     
    const {name = req.body.user.name, email = req.body.user.email, password = req.body.user.password, postImage = req.body.postImage} = req.body;
    console.log("name", name);
    const path = './public/uploads/'+Date.now()+'.png'
    const base64Data = postImage.image.toString().replace(/^data:([A-Za-z-+/]+);base64,/, '');
    fs.writeFileSync(path, base64Data,  {encoding: 'base64'});
    const pathForDb = path.replace('./public/','/');

    let find =  await myDb.getRepository(user).findOne({
      where: {
        email: email
      }
    })
    if(find){
      res.send({ message: "User Already Exist"});
    }
    else{
        myDb.getRepository(user).insert({
        name: name,
        email: email,
        password: password,
        image: pathForDb,
        
    }).then(async () => {
      
      const regUser =  await myDb.getRepository(user).findOne({
        where: {
          email: email
        }})
              
      res.send({ message: "Successfully Registered"});
      console.log("Data Inserted Successfully..!!")
    }).catch(()=> {
      console.log("Data not insrted..!!")
    })
    }
  });

module.exports = router;