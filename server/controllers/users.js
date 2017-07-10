let mongoose = require('mongoose')
let User = mongoose.model("User")
let Product = mongoose.model("Product")

module.exports = {
  
  like: (request, response)=>{
    if(true){
    User.findOne({github_id: request.body.github_id}, (err, user)=>{
      if(err){
        console.log("err in like users.js", err)
        response.status(500).json("error finding user")
      }else{
        if(user){
          let found = false
          let incVal = 0
          let userLikeBool = false
          if(user.likes){
            user.likes.forEach((like, index)=>{
              if(like.product_id == request.body.product_id){
                console.log("found product in user likes")
                found = true
                if(Number(request.body.value)== like.value){
                  console.log("user.likes.....")
                  console.log(user.likes)
                  user.likes.splice(index, 1)

                  if(Number(request.body.value)){
                    incVal = -1
                  }else{
                    incVal = 1
                  }
                }else{
                  //toggling value
                  like.value = !like.value

                  if(Number(request.body.value)){
                    incVal = 2
                  }else{
                    incVal = -2
                  }
                }
                user.save().then((result)=>{
                Product.findByIdAndUpdate(request.body.product_id, {$inc: {votes: incVal}}, (err, res)=>{
                if(err){
                  console.log("error saving", err)
                }else{
                  console.log(res)
              }
            })
            response.json(result)
          }).catch((errr)=>{console.log(errr); response.status(500).json("idk...")})

              }
            })
            //after for loop
            if(!found){
              if(Number(request.body.value)){
                incVal = 1
                userLikeBool = true
              }else{
                incVal = -1
                userLikeBool = false
              }
              User.findOneAndUpdate({github_id: request.body.github_id}, {$push: {likes: {product_id: request.body.product_id, value: userLikeBool}}}, (err, user)=>{
                if(err){console.log(err); response.status(500).json(err)}else{
                  Product.findByIdAndUpdate(request.body.product_id, {$inc: {votes: incVal}}, (err, res)=>{
                    if(err){
                      console.log(err)
                    }else{
                      
                    }
                  })

                }
                response.json(user)
              })

            }

          }
          

        }else{
          console.log("no user!")
          response.status(500).json("no user....")
        }
      }
    })
  }  
  },
  
  getAll: (request, response)=>{
    User.find({}).exec((error, users)=>{
      if(error){
        console.log(error)
        response.status(500).json(false)
      }else{
        response.json(users)
      }
    })
  },
  create: (request, response)=>{
    User.findOne({github_id: request.body.github_id}, (error, user)=>{
      if(error){
        console.log("error finding user  create: users.js")
        response.status(500).json(false)
      }else{
        if(user){

          response.json(user)
        }else{
          //user not in db, create user
          let newUser = new User(request.body)
          
          newUser.save().then(()=>{response.json(newUser)}).catch(()=>{console.log("catch in create user users.js")
          response.status(500).json("user failed to save")
          })
        }
      }
    })
  },
  getOne: (request, response)=>{
    User.findOne({github_id: request.params.id}, (err, user)=>{
      if(err){
        response.status(500).json(false)
      }else{
        response.json(user)
      }
    })
  },
  checkStatus: (request, response)=>{

    if(request.isAuthenticated()){

      response.json(request.user)
    }else{
      response.status(401).json("not authenticated")
    }
  },
  

}