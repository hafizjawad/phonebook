import express, { Request, Response } from "express";
const router = express.Router();
import { user } from "../../entity/user"
import { phonebook } from "../../entity/phonebook"
import {myDb} from "../../index";


 
router.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    let id1 = parseInt(id);
    console.log("From backend", id);
    let finduser =  await myDb.getRepository(user).findOne({
      where: {
        id: id1
      }
    })


   let find =  await myDb.getRepository(phonebook).find({
    where: {
      userId: finduser?.id
    }
  })
  if(find){
      res.send(find)
    }else{
      res.send({message: "No User Exsist"});
    }
  }
);

module.exports = router;


