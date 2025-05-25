import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User.entity";
import { Software } from "../entities/Software.entity";
import { Request } from "../entities/Request.entity";
import dotenv from "dotenv";


dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,  
  synchronize: true,
  logging: true,
  entities: [User, Software, Request],
  extra: {
    family: 4,
  }
});

export async function connect() {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
} catch (error) {
    console.error("Error during Data Source initialization", error);
  }
}


