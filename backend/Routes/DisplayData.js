const express = require('express')
const router = express.Router()
//const FoodItems = require('./../Models/FoodItems.js')
//const FoodCategory = require('./../Models/FoodCategory.js')


router.post('/foodData', async (req, res)=>{
    try{
        return res.send([global.food_items, global.foodCategory])
       /* const foodItems = await FoodItems.find({});
        const foodCategory = await FoodCategory.find({});

        return res.send([foodItems, foodCategory]);*/
    }
    catch(error){
        console.error(error.message);
        res.send("server error")
    }
})

module.exports = router;