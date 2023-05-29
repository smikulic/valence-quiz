require("dotenv").config();
import express, { Request, Response } from "express";
import config from "config";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function bootstrap() {
  // For testing purposes only
  app.get("/api/healthcheck", async (_, res: Response) => {
    res.status(200).json({
      status: "success",
      message: "success",
    });
  });

  // This endpoint is not needed for the quiz task, but
  // it was helpful to provide quick insight into available users.
  app.get("/api/users", async (_, res: Response) => {
    console.log("GET /api/users");
    try {
      const getAllUsers = await prisma.user.findMany();
      return res.json({
        success: true,
        data: getAllUsers,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: error,
      });
    }
  });

  // In production I would implement proper authentication with JWT token
  app.get("/api/user", async (req: Request, res: Response) => {
    const { email } = req.query;
    console.log("GET /api/user: ", email);
    try {
      const getUserById = await prisma.user.findFirst({
        where: { email },
      });
      return res.json({
        success: true,
        data: getUserById,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: error,
      });
    }
  });

  app.post("/api/users", async (req: Request, res: Response) => {
    try {
      // In production I would also make sure that the user email is unique in schema
      // and make this returns proper error if user attempts to submit quiz with existing email.
      console.log("POST /api/users");
      const { email, answers } = req.body;
      const createUser = await prisma.user.create({
        data: {
          email,
          answers,
          // In production and with more time I would've implemented the full
          // business logic for calculating which type is it.
          // But for now, just to demonstrate client side working, I've hardcoded this.

          // What I would do is decorate/enrich existing questionSet (from .csv file)
          // and add points based on answers and Direction, which would help me get the
          // result.
          perspectiveType: "ENTJ",
        },
      });
      console.log({ createUser });
      return res.json({
        success: true,
        data: createUser,
      });
    } catch (error) {
      console.log({ error });
      return res.json({
        success: false,
        message: error,
      });
    }
  });

  const port = config.get<number>("port");
  app.listen(port, () => {
    console.log(`Server on port: ${port}`);
  });
}

bootstrap()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
