import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/postgresConnection.mjs";
import cors from "cors";
import usersRouter from "./routes/index.mjs";
import passport from "./strategies/auth.mjs";

dotenv.config();

const app = express();

const startServer = async () => {
  try {
    const message = await connectDB();
    console.log(message);

    // Allow requests from your frontend domain
    app.use(
      cors({
        origin: "http://localhost:5173", // Change this to your frontend URL
        credentials: true, // Allow cookies and authorization headers
      })
    );
    app.use(express.json()); //must be before the route !!
    app.use(passport.initialize());

    // PAKEISTI IR PRITAIKYTI. BUTINAI PASIDARYT routes su nuorodomis
    app.use("/api/v1/testas", usersRouter);

    const PORT = process.env.PORT || 1000;

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the server or database", error);
  }
};

startServer();
