const CalorieService = require("../services/calorieService");
const service = new CalorieService();

class CalorieController {


    async getDaysOfFood(req, res) {
        try {
            const userid = req.params.userid;
            const days = await service.daysOfFoodByUserId(userid);
            
            res.status(200).json(days);
        } catch (err) {
            res.status(500).send('Internal Server Error');
        }
    };

    async getTotalIntake(req,res){
        try {
            const userid = req.params.userid;
            const total = await service.totalIntake(userid);
            res.status(200).json(total);
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    };

    async getTotalStored(req,res){
        try {
            const userid = req.params.userid;
            const total = await service.totalKcalStored(userid);
            res.status(200).json(total);
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    };
};

module.exports = CalorieController;