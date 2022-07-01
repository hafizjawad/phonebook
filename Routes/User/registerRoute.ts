import express, { Request, Response } from "express";
const app = express();
import { user } from "../../entity/user"
import {myDb} from "../../index";


function registerRoute() {
    
    console.log("hello from register");

return app.post("/register", async (req: Request, res: Response) =>{
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
        password: password
    }).then(() => {
      res.send({ message: "Successfully Registered"});
      console.log("Data Inserted Successfully..!!")
    }).catch(()=> {
      console.log("Data not insrted..!!")
    })
    }
  })
}

module.exports = registerRoute;