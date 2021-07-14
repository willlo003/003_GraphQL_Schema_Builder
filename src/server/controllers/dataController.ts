const dataController = {};
const fetch = require("node-fetch");


export const getData = (req, res, next) => {
  fetch(req.body.link)
    .then((res) => res.json())
    .then((data) => {
      res.locals.data = data
      return next();
    })
    .catch((err) => console.log("fetching error"));

}