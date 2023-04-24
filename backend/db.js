const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.MONGO_URI

/*const mongoDB= async() =>{
    await mongoose.connect(mongoURI, {useNewUrlParser: true}, async(err,result) =>{
        if(err){
            console.log("error",err);
        }
        else{
            console.log("connected");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(function(err, data){
                if(err)
                    console.log(err);
                else
                    console.log(data);
            })
        }
    });
};*/

  const mongoDB = async () => {
    try {
      await mongoose.connect(mongoURI, { useNewUrlParser: true });
      console.log('Connected to MongoDB');
  
      const fetched_data = await mongoose.connection.db.collection('food_items').find({}).toArray();
      const foodCat = await mongoose.connection.db.collection('foodCategory').find({}).toArray();
      global.food_items = fetched_data;
      global.foodCategory = foodCat;
      console.log(global.foodCategory);
    } 
    catch (error) {
      console.error('Error connecting to MongoDB', error);
    }
  };
  


module.exports = mongoDB;

/*module.exports = function (callback) {
  mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
      // mongoDbClient.connect(mongoURI, { useNewUrlParser: true }, async(err, result) => {
      if (err) console.log("---" + err)
      else {
          // var database =
          console.log("connected to mongo")
          const foodCollection = await mongoose.connection.db.collection("food_items");
          foodCollection.find({}).toArray(async function (err, data) {
              const categoryCollection = await mongoose.connection.db.collection("Categories");
              categoryCollection.find({}).toArray(async function (err, Catdata) {
                  callback(err, data, Catdata);

              })
          });
          // listCollections({name: 'food_items'}).toArray(function (err, database) {
          // });
          //     module.exports.Collection = database;
          // });
      }
  })
};*/