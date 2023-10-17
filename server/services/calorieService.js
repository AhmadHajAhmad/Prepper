const PersonModel = require('../models/personModel');
const FoodModel = require('../models/foodModel');
const WaterModel = require('../models/waterModel')

class CalorieService {

    async totalIntake(userid) {
        try {
            const personList = await PersonModel.find({_userid: userid});
            let totalIntake = 0;
            
            for (var i = 0; i < personList.length; i++) {
                let tempPerson = personList[i];
                if (tempPerson.sex.toLowerCase() === "male") {
                    totalIntake += 66 + (13.7 * tempPerson.weight) + (5 * tempPerson.height) - (6.8 * tempPerson.age);
                } else if(tempPerson.sex.toLowerCase() === "female"){
                    totalIntake += 655 + (9.6 * tempPerson.weight) + (1.8 * tempPerson.height) - (4.7 * tempPerson.age);
                }
            };
            return totalIntake;
        } catch (err) {
            throw new Error(err);
        }
    };

    async daysOfWater(userid) {
        try {
            const personList = await PersonModel.find({ _userid: userid });
            const userWater = await WaterModel.findOne({ _userid: userid });
    
            // Calculate total water needs based on person weights
            let totalDailyWaterNeed = 0;
            for (let tempPerson of personList) {
                totalDailyWaterNeed += tempPerson.weight * 0.03;
            }
            const daysLeft = userWater.waterqty / totalDailyWaterNeed;
    
            return daysLeft;
    
        } catch (error) {
            throw error;
        }
    }

    async totalKcalStored(userId) {
        try {
            const foodList = await FoodModel.find({_userid: userId});
            let totalStored = 0;
            
            for (var i = 0; i < foodList.length; i++) {
                let tempFood = foodList[i];
                totalStored += (tempFood.calories * (tempFood.weight*0.01));
            }

            return totalStored;
        } catch (err) {
            throw new Error(err);
        }
    };

    async daysOfFoodByUserId(userId) {
        try {
            const totalIntake = await this.totalIntake(userId);
            const totalKcal = await this.totalKcalStored(userId);
            
            return totalKcal / totalIntake;
        } catch (err) {
            throw new Error(err);
        }
    };
};

module.exports = CalorieService;