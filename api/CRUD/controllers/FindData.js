const Students = setup.models['students']
const Product = setup.models['product']

module.exports = {
    // If you need to get your instance in sync, you can use the methodreload. It will 
    // fetch the current data from the database and overwrite the attributes of the model 
    // on which the method has been called on.
    reload: (req,res)=> {
        Students.findOne({ where: { name: 'user' } }).then(person => {
            person.name = 'jane'
            console.log(person.name) // 'jane'
          
            person.reload().then(() => {
              res.send(person.name) // 'user'
            })
        })
    }
,
    increment: (req,res)=> {
        Product.findByPk(req.params.id).then(product => {
            return product.increment(/*''amount', 'amount2' , {by: 2}*/
            {
                'amount': 2,
                'amount2': 3
              }
            )
        }).then(product => {
            product.reload().then(()=>{
                res.send(product)
            })
            // Postgres will return the updated user by default (unless disabled by setting { returning: false })
            // In other dialects, you'll want to call user.reload() to get the updated instance...
        })
    }
,
    decrement: (req,res)=> {
        Product.findByPk(req.params.id).then(product => {
            return product.decrement(/*'amount', 'amount2' , {by: 2}*/
            {
                'amount': 2,
                'amount2': 3
              }
            )
        }).then(product => {
            product.reload().then(()=>{
                res.send(product)
            })
            // Postgres will return the updated user by default (unless disabled by setting { returning: false })
            // In other dialects, you'll want to call user.reload() to get the updated instance...
        })
    }
}