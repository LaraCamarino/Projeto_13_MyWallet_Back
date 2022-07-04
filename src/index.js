import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoute from "./routes/authRoutes.js";
import transactionsRoutes from "./routes/transactionsRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRoute);
app.use(transactionsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Servidor foi iniciado."));