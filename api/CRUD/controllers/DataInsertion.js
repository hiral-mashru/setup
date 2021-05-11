
const Students = setup.models['students']

module.exports = {

    // Building a non-persistent instance
    build: (req,res)=> {
        Students.build(req.body).save().then(task=>{
            res.status(200).json({
                status: 1,
                message: "Saved."
            })
        }).catch(err=>{
            res.status(500).json({
                status: 0,
                error: err
            })
        });
    },

    // Creating persistent instances 
    create: async (req,res)=>{
        Students.create(req.body).then(student => {
            res.status(200).json({
                status: 1,
                message: "Saved"
            })
        })
    },

    // It is also possible to define which attributes can be set via the create method. 
    // This can be especially very handy if you create database entries based on a form 
    // which can be filled by a user. Using that would for example allow you to restrict 
    // the student model to set only a name but not email:
    // plain = true will only return the values of an instance
    createLimited: async (req,res)=>{
        Students.create(req.body,{ fields: ['name'] }).then(student => {
            res.send(student.get({ plain: true })) // OR JSON.stringify(instance)
        })
    },

    // If you are accepting values directly from the user, it might be beneficial to 
    // limit the columns that you want to actually insert.bulkCreate()accepts an options 
    // object as the second parameter. The object can have a fields parameter, (an array) 
    // to let it know which fields you want to build explicitly
    bulkCreate: (req,res)=> {
        Students.bulkCreate(req.body, { fields: ['name'] },{validate: true}).then(() => { // Notice: There are no arguments here, as of right now you'll have to...
            return Students.findAll();
          }).then(students => {
            res.send(students) // ... in order to get the array of user objects
          })
    }
}