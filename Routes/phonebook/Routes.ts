import express, { Request, Response } from "express";
const cors = require("cors");
import { phonebook } from "../../entity/phonebook";
import { myDataSource } from "../..";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());


const phonebookRepo = myDataSource.getRepository(phonebook);

app.get("/api/getphone/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    let id1 = parseInt(id);
  
   let find =  await phonebookRepo.findOne({
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

  app.put("/api/update", async (req: Request, res: Response) => {
  
  
    const {id, name, phoneno} = req.body;
    let id1 = parseInt(id);
    let update = await phonebookRepo.update(id1, { name: name, phoneno: phoneno })
  
    }
  );

  app.delete("/api/delete/:id", async (req: Request, res: Response) => {
  
  
    const { id } = req.params;
    let id1 = parseInt(id);
    await phonebookRepo.delete(id)
  
    }
  );

  app.post("/api/post", async (req: Request, res: Response) => {
    const { id, name, phoneno } = req.body;
    let id1 = parseInt(id);
    console.log("name & phoneno from post", id, name, phoneno);
    let find =  await phonebookRepo.findOne({
      where: {
        phoneno: phoneno
      }
    })
    phonebookRepo.insert({
        name: name,
        phoneno: phoneno,
        userId: id,
    }).then(() => {
      res.send({ message: "Successfully Registered"});
      console.log("Data Inserted Successfully..!!")
    }).catch((err)=> {
      res.send(err);
      console.log("Data not insrted..!!")
    }
  )}
  );
  



