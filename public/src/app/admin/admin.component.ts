import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "./../database.service"
import { Product } from "./../product"
import {User} from "./../user"
import {Router} from "@angular/router"
import {GithubUser} from "./../github-user"

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  productList: Product[]
  shortList: Product[]
  total = 0;
  user: User
  constructor(private _dbService: DatabaseService, private _router: Router ) { }

  ngOnInit() {

    this._dbService.checkStatus().then((githubUser)=>{

      console.log("githubuser: ",githubUser)
      if(githubUser){

        this._dbService.getOneUser(githubUser.id).then((user)=>{
          this.user = user
          console.log("user from db", user)
          if(user.isAdmin){
            console.log("welcome admin")
          }else{
            this._router.navigate(["/"])
          }
        }).catch((err)=>{
          
          console.log(err)})
      }
    }).catch((error)=>{
      this._router.navigate(["/"])
      console.log(error)
    })

    this.updateProducts()
    console.log(this.productList)
 
  }
  reset(){
    console.log("reset function client side")
    this._dbService.reset().then(()=>{console.log("reset items!")}).catch((err)=>{console.log(err)})
    
  }
    updateProducts(){
    this._dbService.getAllProducts().then((products)=>{
    this.productList = products
    this.shortList = products
    this.shortList.length = 10

    this.shortList.forEach((product) => {
      console.log(product.price)
      console.log(parseFloat(product.price.replace(/[^0-9]/g,''))/100)
      this.total += parseFloat(product.price.replace(/[^0-9]/g,''))/100  
      
    })

    })
  }
}
