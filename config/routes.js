const home = require('../app/controllers/home');

module.exports = function (app){
  
  app.get('/', home.home);
  //post form
  // generate site
  app.post('/generate',home.convertCsv, home.generate);

 }

