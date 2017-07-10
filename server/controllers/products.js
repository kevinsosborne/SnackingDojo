let mongoose = require('mongoose')
let Product = mongoose.model("Product")
let User = mongoose.model("User")
module.exports = {
  getAll: (request, response)=>{
    Product.find({}).sort("-votes").exec((error, products)=>{
      if(error){
        console.log(error)
        response.status(500).json(error)
      }else{
        response.json(products)
      }
    })
  },
  getOne: (request, response)=>{
    Product.findById(request.params.id).populate("comments._user").exec((err, product)=>{
      if(err){
        response.status(500).json("error finding product")
      }else{
        response.json(product)
      }
    })
  },
  addComment: (request, response)=>{
    Product.findByIdAndUpdate(request.body.product_id, {$push: {comments: {comment: request.body.comment, _user: request.body.user_id, createdAt: request.body.createdAt}}}, (err, product)=>{
      if(err){
        console.log("err adding comment")
        response.status(500).json(err)
      }else{
        response.json(product)
      }
    })
  },
  reset:(request, response)=>{
    console.log("reset server side")
    if(request.isAuthenticated()){
      console.log("user authenticated, pulling from db")
      User.findOne({github_id: request.user.id}, (err, user)=>{
      if(err){
        console.log("error finding user")
        response.status(500).json(false)
      }else{
        if(user){
          console.log("found user:", user)
        if(user.isAdmin){
          console.log("user is admin!")
          //reset everything
          Product.update({},{$set: {votes:0}}, {multi: true},(err,raw)=>{
            console.log("updating products!", raw)
            if(err){
              console.log("there was an error....")
              console.log(err)
            }
          })
          User.update({}, {$set: {likes: []}},(err, raw)=>{
            console.log("updating users!", raw)
            if(err){
              console.log(err)
            }
          })
        }else{
          response.status(500).json("not admin")
        }}else{response.status(500).json("not admin")}
      }
    })

    }else{
      response.status(401).json("not authenticated")
    }
  },
  create: (request, response)=>{
    //request.body should be of the form:
    //{name: "product-name", img: "www.img.com/img.png"}
    let newProduct = new Product(request.body)
    newProduct.save().then((product)=>{
      console.log("saved, returning product as json")
      response.json(product)
    }).catch((error)=>{
      console.log("error in products.js create", error)
      response.status(500).json(false)
    })
  },
  createMany: (request, response)=>{
    //array of product objects
    for (let product of request.body){
      let newProduct = new Product(product)
      newProduct.save().then((product)=>{
      console.log("saved, returning product as json")
      response.json(product)
      }).catch((error)=>{
        console.log("error in products.js create", error)
        response.status(500).json(false)
      })
    }
  }


}