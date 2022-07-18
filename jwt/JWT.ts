import { Request, Response } from "express";
import {myDb} from "../index";
import {user} from "../entity/user"

require('dotenv').config();

const { sign, verify } = require("jsonwebtoken");


const createTokens = async (id: number) => {
  const accessToken = await sign({ id: id }, process.env.SECRET_KEY, {expiresIn: '1h'});
  console.log("Secret_key from env", process.env.SECRET_KEY);

  return accessToken;
};

const checkUserAuth = async (req: Request, res: Response, next: any) => {
 const { authorization } = req.headers;
 console.log("From checkAuth", authorization);
 if(authorization && authorization.startsWith('Bearer')) {
   try {
        let userId;
        let token = authorization.split(' ')[1];
        verify(token, process.env.SECRET_KEY, function(err: any, decodeToken: any){
        if(err){
             console.log("Error", err)
             res.send("Invalid Token").status(404);
        }
        else{
          userId = decodeToken.id;
          console.log("User Id", userId);
          
      
          
        }
      });

      let find = await myDb.getRepository(user).findOne({
        where: {
        id: userId
        }
   })
          // @ts-ignore
      req.body.user = find.id;
   
   next();
     
      
   } catch (error) {
      console.log(error);
      res.status(404);
   }
}else {
  console.log("In else state")
  res.status(404);
}

}


module.exports = { createTokens , checkUserAuth};
