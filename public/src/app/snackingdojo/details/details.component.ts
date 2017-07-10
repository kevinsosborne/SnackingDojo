import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from "@angular/router"
import {DatabaseService} from "./../../database.service"
import {Product} from "./../../product"
import {User} from "./../../user"
import {GithubUser} from "./../../github-user"
import {Comment} from "./../../comment"
import { MdButton } from '@angular/material';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  product = new Product
  product_id = ""
  commentCount = 0
  //need to sort comments somehow?
  //need to refresh item page after adding comment
  user_id = ""
  githubUser: GithubUser
  commentData: Comment = new Comment
  constructor(private _route: ActivatedRoute, private _dbService: DatabaseService, private _router: Router) {
    this._route.params.subscribe((param)=>{
      this.product_id = param.id

    })
  }
  submitComment(comment){
    console.log("date: ", new Date())
    comment.createdAt = new Date()
    console.log(comment)

    this._dbService.addComment(comment).then((something)=>{
      console.log(something)
      this.getProduct()
    }).catch((err)=>{
      console.log(err)
    })
    this.commentData = new Comment
    this.commentData.user_id = this.user_id
    this.commentCount += 1
  }
  ngOnInit() {
    console.log("***********")
    this.getProduct()
    this._dbService.checkStatus().then((user)=>{
      this.githubUser = user
      this._dbService.getOneUser(user.id).then((dbUser)=>{
        console.log("user form db?", dbUser)
        this.user_id = dbUser._id
        this.commentData.user_id = dbUser._id

        console.log(this.commentData)
      }).catch((err)=>{
        console.log("differnt error")
      })
    }).catch((error)=>{
      console.log("not logged in")
    })
    console.log("this.product", this.product)
  }
  sortComments(){
    this.product.comments.sort((a, b)=>{
      return Number(b.createdAt>a.createdAt)
    })
  }
  getProduct(){
    this._dbService.getOneProduct(this.product_id).then((product)=>{
        console.log("got product")
        this.product = product
        this.sortComments()
        this.commentData.product_id = product._id
        console.log(this.product)
      }).catch((err)=>{
        console.log(err)
      })
  }
}
