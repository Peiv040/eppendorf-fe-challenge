import 'dotenv/config'

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(bodyParser.json());

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
