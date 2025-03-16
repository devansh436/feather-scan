import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/test", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.post("/", (req: Request, res: Response) => {
  res.json({ message: "POST request received!" });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
