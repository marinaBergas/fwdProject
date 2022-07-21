import express from "express";
const students = express.Router();
students.get("/", (req, res) => {
  // console.log(req.query.title);
  res.send("server on work student");
});
export default students;