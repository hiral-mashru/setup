module.exports = {
 CreateOrUpdate: (req,res,next)=> {
  console.log("This is middleware CreateOrUpdate")
  res.send('This is middleware CreateOrUpdate')
  next();
 }
}