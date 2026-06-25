import express from "express";
import morgan from "morgan";
import { cwd } from "node:process";
const app = express();

const PORT = 3000;

const profiles = [];

//
app.use(morgan("dev"));

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

//routes

// home (root)

app.route("/").get((req, res) => {
  res.sendFile(`${cwd()}/pages/index.html`);
});

// about
app.route("/about").get((req, res) => {
  res.sendFile(`${cwd()}/pages/about.html`);
});

// contact
app
  .route("/contact")
  .get((req, res) => {
    res.sendFile(`${cwd()}/pages/contact.html`);
  })
  .post((req, res) => {
    profiles.push(req.body);
    res.sendFile(`${cwd()}/pages/success.html`);
  });

app.use((req, res) => {
  res.status(404).sendFile(`${cwd()}/pages/404.html`);
});

app.listen(PORT, () => console.log("Server started on port : ", PORT));
