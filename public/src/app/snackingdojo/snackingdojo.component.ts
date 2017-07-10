import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from "./../user"
import { Product } from "./../product"
import { Like } from "./../like"
import {Comment} from "./../comment"
import { DatabaseService } from "./../database.service"
import {GithubUser} from "./../github-user"
import { Router } from "@angular/router"
import { MdDialog, MdDialogConfig } from '@angular/material';
import { DetailsComponent } from "./details/details.component"
@Component({
  selector: 'app-snackingdojo',
  templateUrl: './snackingdojo.component.html',
  styleUrls: ['./snackingdojo.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SnackingdojoComponent implements OnInit {
  categories = ["Candy & Chocolate","Chips & Pretzels","Cookies & Cakes","Crackers","Energy & Granola Bars","Nuts, Seeds & Dried Fruit","Popcorn & Jerky","Trail Mix & Snack Mix"]
  productList: Product[]
  user: User
  githubUser: GithubUser = new GithubUser
  user_id = ""
  search = ""
  CategorySearch = ""
  productsUserLikes = []
  productsUserDislikes = []
  constructor(private _dbService: DatabaseService, public dialog : MdDialog) { }
  checkStatus(){
    console.log("checking status")
    if(this.githubUser.id){
      if(!this.productsUserLikes&&!this.productsUserDislikes){
        console.log("inside !proudctsuserlikes && !userDisklikes")
        this.updateUser(this.user.github_id)
      }
      return true
    }

      this._dbService.checkStatus().then((githubUser)=>{
      console.log("dbservice check status")
      console.log(githubUser)
      this.githubUser = githubUser
      this.updateUser(githubUser.id)
    }).catch((error)=>{
    })
  }

  CategorySetter(category){
    console.log(category);
    console.log(this.CategorySearch)
    if(this.CategorySearch == category)
    {
      this.CategorySearch = "";
    }
    else
    {
    this.CategorySearch = category;
    }
    

  }


  openItem(id: string){
    let config = new MdDialogConfig();
    // config.width = "80%";
    config.panelClass = "modalPane"
    let dialogRef: any = this.dialog.open(DetailsComponent, config)
    dialogRef.componentInstance.product_id = id
    dialogRef.afterClosed().subscribe(()=>{
      if(dialogRef.componentInstance.commentCount){
        this.productList.forEach((product)=>{
        if(product._id == id){
          for(let i = 0; i < dialogRef.componentInstance.commentCount; i++){
            console.log("pushing dummy comment", product.comments[0])
            product.comments.push(product.comments[0])
          }

        }
      })}
    })
  }

  ngOnInit() {
    console.log("oninit")
    this.checkStatus()
    console.log("this.user ", this.user)
    if(this.user){
      console.log("user exists, updating user")

    }

    this.updateProducts()


  }
  vote(data){
    console.log("inside vote method")


    if(this.user){
      console.log("inside vote(data)  this.user = ", this.user)
      data.github_id = this.githubUser.id
      this._dbService.likeProduct(data).then(()=>{
        this.updateProductVotes(data.product_id, data.value)
        // this.updateUser(this.githubUser.id);
        // this.updateProducts()
      }).catch((err)=>{
      console.log(err)
    })
  }else{
      window.location.href = '/auth/github'
      // this.checkStatus()
    }

  }
  updateProductVotes(product_id, value){
    let product: Product
    let inc: number

    if(this.productsUserLikes.includes(product_id)){
      console.log("found product in productsUserLikes list", this.productsUserLikes)
        if(value){
          inc = -1

        }else{
          inc = -2
          //add to dislikes array
          this.productsUserDislikes.push(product_id)
        }
        this.productsUserLikes.forEach((products, index)=>{
          if (products == product_id){
            console.log("local user likes ", this.productsUserLikes)
            this.productsUserLikes.splice(index, 1)
            console.log("removing from likes", products)
            console.log("local user likes after...", this.productsUserLikes)
            console.log("users likes: ", this.user.likes)

          }
        })

    }
    else if(this.productsUserDislikes.includes(product_id)){
      if(!value){
        inc = 1

      }else{
        inc = 2
        //add to likes
        this.productsUserLikes.push(product_id)
      }
      this.productsUserDislikes.forEach((products, index)=>{
          if (products == product_id){
            this.productsUserDislikes.splice(index, 1)
          }
        })


    }
    else{
      console.log("inside else")
      if(value){
        inc = 1
        this.productsUserLikes.push(product_id)
      }else{
        this.productsUserDislikes.push(product_id)
        inc = -1
      }
    }

    this.productList.forEach((product:Product, index)=>{
      if(product._id == product_id){
        console.log("incrementing product.votes: current = ", product.votes)
        product.votes +=inc
        console.log("after inc...", product.votes)

      }
    })
    this.productList.sort((product1, product2)=>{
      if(product2.votes - product1.votes !=0){
      return product2.votes - product1.votes
      }else{
        return product1.name.localeCompare(product2.name)
      }
    })


  }
  updateUser(user_id){
    this.productsUserDislikes = []
    this.productsUserLikes = []
    console.log(this.user_id)
    this._dbService.getOneUser(user_id).then((user)=>{
      console.log("************************")
      if(user){this.user = user
      console.log(user)

      user.likes.forEach((like)=>{
        if(like.value){
          this.productsUserLikes.push(like.product_id)
        }else{
          this.productsUserDislikes.push(like.product_id)
        }
      })}else{
        this._dbService.createUser({github_id : this.githubUser.id, username: this.githubUser.username, img: this.githubUser._json.avatar_url}).then((user)=>{
          this.user = user
        }).catch((asdf)=>{
          console.log(asdf)
        })
      }
    })
  }
  updateProducts(){
    this._dbService.getAllProducts().then((products)=>{
      this.productList = products
    })
  }
}
