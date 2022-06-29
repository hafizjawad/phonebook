import express, { Request, Response } from "express";
const cors = require('cors');
import { user } from "../../entity/user";
import { phonebook } from "../../entity/phonebook";
import { myDataSource } from "../..";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const userRepo = myDataSource.getRepository(user);
const phonebookRepo = myDataSource.getRepository(phonebook);

module.exports = function(app: any){

app.post("/login", async (req: Request, res: Response) =>{
    const {email,password} = req.body;
    let find =  await userRepo.findOne({
      where: {
        email: email
      }
    })
    if(find){
      if(password === find.password){
        res.send({message: "Login Successful", find})
      }else{
        res.send({message: "incorrect password"});
      }
    }
    else{
      res.send({message: "User not Registered"})
    }
  });

app.post("/register", async (req: Request, res: Response) =>{
  const {name,email,password} = req.body;
  let find =  await userRepo.findOne({
    where: {
      email: email
    }
  })
  if(find){
    res.send({ message: "User Already Exist"});
  }
  else{
    userRepo.insert({
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


  
    
});

//for Login
app.get("/api/get/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    let id1 = parseInt(id);
    console.log("From backend", id);
    let finduser =  await userRepo.findOne({
      where: {
        id: id1
      }
    })


   let find =  await phonebookRepo.find({
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
}