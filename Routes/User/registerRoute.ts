import { Request, Response } from "express";
import { user } from "../../entity/user"
import {myDb} from "../../index";
const {createTokens} = require ("../../jwt/JWT");

const express = require('express')
const router = express.Router();
 

router.post("/", async (req: Request, res: Response) =>{
  console.log("hello from register");
    const {name,email,password} = req.body;
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
        
    }).then(async () => {
      
      const regUser =  await myDb.getRepository(user).findOne({
        where: {
          email: email
        }})
        const accessToken = await createTokens(regUser?.id);       
      res.send({ message: "Successfully Registered", token: accessToken});
      console.log("Data Inserted Successfully..!!")
    }).catch(()=> {
      console.log("Data not insrted..!!")
    })
    }
  });

module.exports = router;