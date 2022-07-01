import { DataSource } from "typeorm";

export class db {

    constructor() {}

    dbCon() {

        const DataSource1 = new DataSource({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "password",
            database: "phonebook",
            synchronize: true,
            entities: ['./entity/*.ts'],
           
          })

          DataSource1.initialize().then(() => {
            console.log("Database Connected Successfully..!!");
          })
          .catch((err: any) => {
            console.log(err);
          });

          return DataSource1;
    }
}