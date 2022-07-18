import express, { Request, Response } from "express";
const router = express.Router();
import { user } from "../../entity/user"
import {myDb} from "../../index";


router.get("/", async (req: Request, res: Response) => {
  console.log("Hello from find user")
    // @ts-ignore
    const id = req.body.user;
    let finduser =  await myDb.getRepository(user).findOne({
      where: {
        id: id
      }
    })
  if(finduser){
    console.log("Find User", finduser)
      res.send(finduser)
    }else{
      res.send({message: "No User Exsist"});
    }
  }
);

module.exports = router;


