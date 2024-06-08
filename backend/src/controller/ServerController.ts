import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import express, { Express } from "express";
import { UserController } from "./UserController";
import { GameController } from "./GameController";

export class ServerController {
  private app: Express = express();
  private port = process.env.PORT ?? 3000;
  constructor() {
    dotenv.config();
    this.app.use(express.json());
    this.app.use(cors());
    this.app.listen(Number(this.port), "localhost", () => {
      console.log(`Server is running at http://localhost:${this.port}`);
    });
    mongoose.connect(process.env.DATABASE_URL ?? "");
    this.setEndpointsHandling();
  }
  private setEndpointsHandling() {
    new UserController(this.app);
    new GameController(this.app);
  }
}
