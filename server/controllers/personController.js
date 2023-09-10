const PersonModel = require("../models/personModel");

class PersonController {
  async createPerson(req, res) {
    try {
      //const userId = req.user.id; // Assuming the user ID is available after authentication
      const name = req.body.name;
      const age = req.body.age;
      const weight = req.body.weight;
      const sex = req.body.sex;

      // Other person-related fields from the request body

      const newPerson = new PersonModel({
        name: name,
        age: age,
        weight: weight,
        sex: sex,

        //user: userId, // Associate the person with the logged-in user
        // Other person-related fields
      });

      await newPerson.save();
      res.status(201).json(newPerson);
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: "Error creating person" });
    }
  }

  async getAllPersons(req, res) {
    try {
      const persons = await PersonModel.find({});
      res.status(200).json(persons);
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: "Error fetching persons" });
    }
  }

  async getpersonById(req, res) {
    const id = req.params.id;

    try {
      const person = await PersonModel.findById(id);
      if (!person) {
        return res.status(404).send("Person not found");
      }
      res.status(201).json(person);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async deleteById(req, res) {
    const id = req.params.id;

    try {
      const result = await PersonModel.findByIdAndDelete(id);
      if (!result) {
        return res.status(404).send("Person not found");
      }
      res.status(200).send(`Person with ID ${id} was deleted.`);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async updateByID(req, res) {
    const id = req.params.id;
    const updateData = req.body;

    try {
      const person = await PersonModel.findById(id);
      if (!person) {
        return res.status(404).send("Person not found");
      }
      const updatedPerson = await PersonModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );
      res.status(200).json(updatedPerson);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = PersonController;
