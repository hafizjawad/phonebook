import { Request, Response } from "express";
import {myDb} from "../index";
import {user} from "../entity/user"

require('dotenv').config();

const { sign, verify } = require("jsonwebtoken");


const createTokens = (id: number) => {
  const accessToken = sign({ id: id }, process.env.SECRET_KEY, {expiresIn: '1m'});
  console.log("Secret_key from env", process.env.SECRET_KEY);

  return accessToken;
};

const checkUserAuth = async (req: Request, res: Response, next: any) => {
 const { authorization } = req.headers;
 console.log("From checkAuth 1", authorization);
 if(authorization) {
   try {
        let userId;
        verify(authorization, process.env.SECRET_KEY, function(err: any, decodeToken: any){
        if(err){
             
        }
        else{
          userId = decodeToken.id;
          
        }
      });
      console.log("User Id", userId);
      let find = myDb.getRepository(user).findOne({
        where: {
          id: userId
        }
      })
      
      next();
   } catch (error) {
      console.log(error);
      res.status(404);
   }
}
else {
  res.status(404);
}

}


module.exports = { createTokens , checkUserAuth};
