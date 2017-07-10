import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: any, search: string, CategorySeach: string): any {
    
    if(!search && !CategorySeach){return products}
    let filtered = []
    for(let product of products){
      if(CategorySeach)
      {
           if(product.category.toLowerCase().includes(CategorySeach.toLowerCase()))
           {
              filtered.push(product)
           }
      } else {
        filtered = products
      }
      // if(search)
      // {  
      //     console.log("Hit Search")
      //     if(product.name.toLowerCase().includes(search))
      //     {
      //       console.log("Hit Filter Product Category", product.name)  
      //       filtered.push(product)
      //     }
      // }
      filtered = filtered.filter((item)=>{
          return item.name.toLowerCase().includes(search)
      })
    }
    return filtered
  }

}
