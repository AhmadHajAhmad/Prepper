const PersonModel = require("../models/personModel");

class PersonController {
  async createPerson(req, res) {
    try {
      const name = req.body.name;
      const age = req.body.age;
      const weight = req.body.weight;
      const height = req.body.height;
      const sex = req.body.sex;
      const userId = req.params.userid;

      const newPerson = new PersonModel({
        name: name,
        age: age,
        weight: weight,
        height: height,
        sex: sex,
        _userid: userId,
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
      const persons = await PersonModel.find({})
        .sort({ age: 1 })
        .exec();
      res.status(200).json(persons);
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: "Error fetching persons" });
    }
  }

  // Get all people by a specific user id, sorted by age in ascending order
  async getAllPeopleByUser(req, res) {
    const userid = req.params.userid;

    try {
      const people = await PersonModel.find({ _userid: userid })
        .sort({ name: 1 })
        .exec();

      res.json(people);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  // Get a person by it's id
  async getpersonById(req, res) {
    const personid = req.params.personid;

    try {
      const person = await PersonModel.findById(personid);
      if (!person) {
        return res.status(404).send("Person not found");
      }
      res.status(201).json(person);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
  // Get a person by it's id and user id
  async getByUserId(req, res) {
    const personid = req.params.personid;
    const userid = req.params.userid;

    try {
      const person = await PersonModel.findOne({
        _userid: userid,
        _id: personid,
      });
      if (!person) {
        return res.status(404).send("Person not found");
      }
      res.status(201).json(person);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
  // Delete a person by it's id
  async deleteByPersonId(req, res) {
    const personid = req.params.personid;

    try {
      const person = await PersonModel.findByIdAndDelete(personid);
      if (!person) {
        return res.status(404).send("Person not found");
      }
      res.status(200).send(person);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
  // Delete a person by it's id and by user id
  async deleteByUserId(req, res) {
    const personid = req.params.personid;
    const userid = req.params.userid;

    try {
      const person = await PersonModel.findOneAndDelete({
        _userid: userid,
        _id: personid,
      });
      if (!person) {
        return res.status(404).send("Person not found");
      }
      res.status(200).send(`Person with ID ${personid} was deleted.`);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
  // Update a person by it's id
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
  //Update a person by it's id and user id
  async updateByUserId(req, res) {
    const personid = req.params.personid;
    const userid = req.params.userid;
    const updateData = req.body;
    try {
      const updatedPerson = await PersonModel.findOneAndUpdate(
        { _userid: userid, _id: personid },
        updateData,
        { new: true }
      );
      if (!updatedPerson) {
        return res.status(404).send("Person not found");
      }
      res.status(200).send(updatedPerson);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
  async deleteAllByUserId(req, res) {
    const userid = req.params.userid;
    try {
      const result = await PersonModel.deleteMany({ _userid: userid });
      if (result.deletedCount === 0) {
        return res.status(404).send("No people found to delete");
      }
      res.status(200).send(`Deleted ${result.deletedCount} people`);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = PersonController;
