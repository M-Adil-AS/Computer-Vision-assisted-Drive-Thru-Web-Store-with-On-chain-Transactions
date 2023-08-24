const itemsCollection = require('../db').db().collection('Items')
const pkgs = require('../utility/packages')
const ObjectID = require('mongodb').ObjectID

let Item = function(data){
    this.data = data
    this.errors = []
}

Item.prototype.update = function(itemID){
    return new Promise(async(resolve,reject)=>{
        try{
            if(typeof(itemID)!='string' || !ObjectID.isValid(itemID)){
                reject(['The item you are trying to update does not exist!'])
                return  
            }

            let item = await itemsCollection.findOne({_id: new ObjectID(itemID)})
            
            if(item){
                this.cleanUp('update')
                this.validate(Object.keys(this.data), 'update')
        
                if(!this.errors.length){
                    await itemsCollection.updateOne({_id: new ObjectID(itemID)},{$set:this.data})                
                    resolve()
                }
                else{
                    reject(this.errors)
                }
            }
            else{
                reject(['The item you are trying to update does not exist!'])
            }
        }
        catch(error){
            console.log(error,'Location: query/update()/Item.js')
            this.errors.push('Unexpected Error! Please try again later.')
            reject(this.errors)
        }
    })
}

Item.prototype.import = function(){
  return new Promise(async(resolve,reject)=>{
      try{
        this.cleanUp('import')
        await this.validate(Object.keys(this.data), 'import')

        if(!this.errors.length){
            await itemsCollection.insertOne(this.data)
            resolve()
        }
        else{
            reject(this.errors)
        }
      }
      catch(error){
          console.log(error,'Location: query/update()/Item.js')
          this.errors.push('Unexpected Error! Please try again later.')
          reject(this.errors)
      }
  })
}

Item.prototype.cleanUp = function(operation){
    let keys = ['src', 'title', 'category', 'sub_category', 'price', 'qty', 'desc']
  
    keys.forEach((key)=>{
      if(typeof(this.data[key])!= "string"){this.data[key] = ""}
    })
  
    this.data = {
      src:               this.data.src.trim(),
      qty:               this.data.qty.trim(),
      desc:              this.data.desc.trim(),
      price:             this.data.price.trim(),
      title:             this.data.title.trim(),
      category:          this.data.category.trim().toLowerCase(),
      sub_category:      this.data.sub_category.trim().toLowerCase()
    }
  
    if(operation=='update'){
      delete this.data.src
      delete this.data.desc
      delete this.data.title
      delete this.data.category
      delete this.data.sub_category
    }
}

Item.prototype.validate = function(toBeValidated, operation){
    return new Promise(async(resolve,reject)=>{
 
      if(toBeValidated.includes('qty')){
        if(this.data.qty == ""){this.errors.push("You must provide quantity of item")}
        if(this.data.qty != "" && !pkgs.isNumeric(this.data.qty)){this.errors.push("Quantity can contain only numbers.")}
      }
      if(toBeValidated.includes('price')){
        if(this.data.price == ""){this.errors.push("Price is required")} 
        if(this.data.price != "" && !pkgs.isNumeric(this.data.price)){this.errors.push("Price can contain only numbers.")}
      }
      if(toBeValidated.includes('title')){
        if(this.data.title == ""){this.errors.push("Title is required")}
        if(this.data.title.length > 80){this.errors.push("Title cannot exceed 80 characters.")}
      }
      if(toBeValidated.includes('desc')){
        if(this.data.desc == ""){this.errors.push("Desc is required")}
        if(this.data.desc.length > 80){this.errors.push("Desc cannot exceed 80 characters.")}
      }
      if(toBeValidated.includes('src')){
        if(this.data.src == ""){this.errors.push("Image URL is required")}
        if(this.data.src.length > 200){this.errors.push("URL length cannot exceed 200 characters.")}
      }
      if(toBeValidated.includes('category')){
        if(this.data.category == ""){this.errors.push("Category is required")}
        if(this.data.category.length > 80){this.errors.push("Category length cannot exceed 80 characters.")}
      }
      if(toBeValidated.includes('sub_category')){
        if(this.data.sub_category == ""){this.errors.push("Sub category is required")}
        if(this.data.sub_category.length > 80){this.errors.push("URL length cannot exceed 80 characters.")}
      }
      
      if(!this.errors.length && operation=='import'){
        try{
          let item = await itemsCollection.findOne({title:this.data.title, desc:this.data.desc, category:this.data.category, sub_category:this.data.sub_category})
          if(item){this.errors.push('This item already exists in your inventory!')}
        }
        catch(error){
          console.log('Location: query/validate()/Item.js', error)
          this.errors.push('Unexpected Error! Please try again later.')
        }
      }

      resolve()
    })
}

module.exports = Item