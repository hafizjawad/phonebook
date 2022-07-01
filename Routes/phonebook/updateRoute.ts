import express, { Request, Response } from "express";
import { phonebook } from "../../entity/phonebook";
const router = express.Router();
import {myDb} from "../../index";

router.put("/", async (req: Request, res: Response) => {
  
  
    const {id, name, phoneno} = req.body;
    let id1 = parseInt(id);
    let update = await myDb.getRepository(phonebook).update(id1, { name: name, phoneno: phoneno })
  
    }
  );

  module.exports = router;