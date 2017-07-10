let mongoose = require('mongoose')
let fs = require('fs')
let path = require('path')
mongoose.connect('mongodb://localhost/snackingDojo')
let models_path = path.join(__dirname, './../models')
mongoose.Promise = global.Promise
fs.readdirSync(models_path).forEach((file)=>{
  if(file.includes('.js')){
    require(path.join(models_path, file))
  }
})