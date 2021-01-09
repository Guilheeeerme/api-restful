import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    hello: "world",
  });
});

export default app;
