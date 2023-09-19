const CalorieService = require("../services/calorieService");
const service = new CalorieService();

class CalorieController {


    async getDaysOfFood(req, res) {
        try {
            const userid = req.params.userid;
            const days = await service.daysOfFoodByUserId(userid);
            
            res.status(200).send(`You have ${days.toFixed(1)} days of food left.`);
        } catch (err) {
            res.status(500).send('Internal Server Error');
        }
    };

    async getTotalIntake(req,res){
        try {
            const userid = req.params.userid;
            const total = await service.totalIntake(userid);
            res.status(200).send(`You need ${total.toFixed(1)} calories per day.`);  
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    };

    async getTotalStored(req,res){
        try {
            const userid = req.params.userid;
            const total = await service.totalKcalStored(userid);
            res.status(200).send(`You have ${total.toFixed(1)} calories stored.`);
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    };
};

module.exports = CalorieController;