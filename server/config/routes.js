let mongoose = require('mongoose')
let users = require("./../controllers/users")
let products = require("./../controllers/products")
let path = require("path")
let passport = require("passport")
let GitHubStrategy = require("passport-github2").Strategy
module.exports = (app)=>{
  //users
  app.post("/users/create", users.create)
  app.post("/users/like", users.like)
  app.get("/users/checkstatus", users.checkStatus)
  app.get("/users/:id", users.getOne)
  
  app.get("/users", users.getAll)
  
  

  //products
  app.get("/products/reset", products.reset)
  app.post("/products/create", products.create)
  app.post("/products/addMany", products.createMany)
  app.post("/products/comment", products.addComment)
  app.get("/products", products.getAll)
  app.get("/products/:id", products.getOne)


  app.get("*", (request, response)=>{
    response.sendFile(path.resolve("./public/dist/index.html"))
  })
}