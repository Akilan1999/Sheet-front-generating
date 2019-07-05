const Joi = require('joi');
const csv = require("csvtojson");


exports.home = function(req, res) {

  res.render('index.ejs');

}

exports.generate = function(req, res) {
    console.log('great, here is the request bod ->', req.body)

    //we can now manipulate the data

}

exports.convertCsv = function(req,res,next){

    const csvStr =  req.body.csv;
    csv()
    .fromString(csvStr)
    .then((jsonObj)=>{
        console.log(jsonObj)
        req.body.csv = jsonObj;
        //delete file at path
        next()
    })
    .catch(err=> {
      console.log(err)

      res.json({"message": "Something went wrong, please try again."})
    })
}



exports.validateData = function(req, res){
  //fix schema
  const schema = Joi.object().keys({
    firstName: Joi.string().alphanum().required(),
    lastName: Joi.string().alphanum().required(),
    companyName: Joi.string().required(),
    logoUrl: Joi.string().uri().required(),
    bannerUrl: Joi.string().uri().required(),
    email: Joi.string().email().required(),
    description: Joi.string().required(),
    csv: Joi.string().required(),
})
console.log('REQUEST BODY', req.body)

schema.validate(req.body, {abortEarly: false})
        .then(validated=> {
            next()
        })
        .catch(err=> console.log(err))

}
