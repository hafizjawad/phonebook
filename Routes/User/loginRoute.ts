import express, { Request, Response } from "express";
const router = express.Router();
import { user } from "../../entity/user"
import {myDb} from "../../index";
const {createTokens, checkUserAuth} = require ("../../jwt/JWT");


router.post("/", async (req: Request, res: Response) =>{

    console.log("hello from post");
    const {email,password} = req.body;
    let find =  await myDb.getRepository(user).findOne({
        
        
      where: {
        email: email
      }
    })
    if(find){
        console.log("user find");
      if(password === find.password){
        const accessToken = await createTokens(find.id);
        console.log("accessToken", accessToken);
        
        res.send({message: "Login Successful", find, token: accessToken});
      }else{
        console.log("user not find");
        res.send({message: "incorrect password"});
      }
    }
    else{
      res.send({message: "User not Registered"})
    }
  });
  
module.exports = router;
