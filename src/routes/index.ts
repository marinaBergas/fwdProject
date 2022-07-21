import express from "express";
const routes = express.Router();
routes.get("/", (req, res) => {
  // console.log(req.query.title);
  res.send("server on work new mm");
});
export default routes;