import express, { Request, Response } from "express";
import { phonebook } from "../../entity/phonebook";
const router = express.Router();
import {myDb} from "../../index";

router.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    let id1 = parseInt(id);

    console.log("Id from edit", id)
  
   let find =  await myDb.getRepository(phonebook).findOne({
    where: {
      id: id1
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