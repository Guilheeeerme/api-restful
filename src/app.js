import express from "express";
import path from "path";

import routes from "./routes/routes";
import "./database";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  "/attachments",
  express.static(path.resolve(__dirname, "..", "temp", "uploads"))
);

app.use(routes);

export default app;
