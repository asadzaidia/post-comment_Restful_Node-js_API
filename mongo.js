const mongoose=require('mongoose');
const mongoDbError=require('mongoose-mongodb-errors');
const urldb='mongodb://<>:<>@ds221095.mlab.com:21095/<>';

mongoose.plugin(mongoDbError);//its make readable error of mongo db
mongoose.Promise=global.Promise; //to use es6 promise not mongoose promise
mongoose.connect(urldb);

