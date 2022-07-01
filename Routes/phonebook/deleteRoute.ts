import express, { Request, Response } from "express";
import { phonebook } from "../../entity/phonebook";
const router = express.Router();
import {myDb} from "../../index";

router.delete("/:id", async (req: Request, res: Response) => {
  
  
    const { id } = req.params;
    let id1 = parseInt(id);
    await myDb.getRepository(phonebook).delete(id1)
  
    }
  );

  module.exports = router;