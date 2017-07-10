import {Like} from "./like"
export class User {
  _id: string
  github_id: string
  img: string
  isAdmin: boolean
  likes: Like[]
  username: string
  
}
