const Students = setup.models['students']
const Op = require('sequelize').Op

module.exports = {
    destroy: async (req,res)=> {
        try{
            const findStudent = await Students.findOne({
                where:{
                    id: {
                        [Op.eq] : req.params.id
                    }
                }
            })
            if(findStudent){
                // await Students.destroy({
                //     where:{
                //         id: {
                //             [Op.eq] : req.params.id
                //         }
                //     }
                // })
                // console.log("deleted")
                await Students.destroy({
                    where:{
                        id: {
                            [Op.eq] : req.params.id
                        }
                    }
                },{ force: true })
                console.log("force deleted")
                await Students.restore({
                    where:{
                        id: {
                            [Op.eq] : req.params.id
                        }
                    }
                })
                console.log("restored")
                res.json({
                    status: 1,
                    message: "done"
                })
            } else {
                res.json({
                    status: 0,
                    message: "not exist"
                })
            }
        } catch(err){
            res.status(500).json({
                status: 0,
                err: err.message
            })
        }
    },
    bulkDelete: async (req,res)=>{
        Students.bulkCreate(req.body).then(() => {
            return Students.destroy({
              where: {
                email: 'c@gmail.com'
              },
            //   truncate: true /* this will ignore where and truncate the table instead */
            },{ force: true });
          }).then(affectedRows => {
            // affectedRows will be 2
            console.log("affectedRows ",affectedRows)
            return Students.findAll();
          }).then(tasks => {
            res.send(tasks) // no programming, just reading :(
          })
    }
}   