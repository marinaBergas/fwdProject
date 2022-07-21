import express from "express";
const teachers = express.Router();
teachers.get("/", (req, res) => {
  // console.log(req.query.title);
  res.send("server on work teachers");
});
export default teachers;