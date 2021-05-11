const Students = setup.models['students']
const Op = require('sequelize').Op

module.exports = {
    update: async (req,res)=> {
        const findStudent = await Students.findOne({
            where:{
                id: {
                    [Op.eq] : req.params.id
                }
            }
        })
        if(findStudent){
            Students.update(req.body,{
                where:{
                    id:{
                        [Op.eq] : req.params.id
                    }
                }
            },{fields: ['name']}).then(()=>{
                res.status(201).json({
                    status: 1,
                    message: "Changed"
                })
            })
        } else {
            res.status(500).json({
                status: 0,
                message: "Not exist"
            })
        }
    },

    // not working
    save: async (req,res)=>{
        const findStudent = await Students.findOne({
            where:{
                id: {
                    [Op.eq] : req.params.id
                }
            }
        })
        if(findStudent){
            Students.name = req.body.name
            Students.email = req.body.email
            Students.save({ fields: ['name'] },{
                where:{
                    id:{
                        [Op.eq] : req.params.id
                    }
                }
            }).then(()=>{
                res.status(201).json({
                    status: 1,
                    message: "Changed"
                })
            })
        } else {
            res.status(500).json({
                status: 0,
                message: "Not exist"
            })
        }
    }
    ,
    bulkUpdate: (req,res)=> {
        Students.bulkCreate(req.body).then(() => {
            return Students.update(
              { name: 'user' }, /* set attributes' value */
              { where: { email: "a@gmail.com" }} /* where criteria */
            );
        }).then(([affectedCount, affectedRows]) => {
            // Notice that affectedRows will only be defined in dialects which support returning: true
            console.log([affectedCount, affectedRows])
            // affectedCount will be 1
            return Students.findAll();
        }).then(tasks => {
            res.send(tasks) // the 'programming' tasks will both have a status of 'inactive'
        })
    }
}