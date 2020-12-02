import express from "express";
import { listings } from "./listings";

const app = express();
const port = 9000;

app.use(express.json());
app.get("/", (_req, res) => res.send("hello world"));
app.get("/listings", (_req, res) => {
  res.send(listings);
});

app.post("/delete-listing", (req, res) => {
  const id: string = req.body.id;

  listings.forEach((listing, idx) => {
    if (listing.id === id) {
      return res.send(listings.splice(idx, 1));
    }
  });

  return res.send("failed to delete listing");
});

app.listen(port);

console.log(`[app] : http://localhost:${port}`);
