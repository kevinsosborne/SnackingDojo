export class Product {
  _id: string
  name: string
  img: string
  votes: number
  price: string
  category: string
  comments: [{comment: string, _user: {_id: string, username: string}, createdAt: Date}]
}
