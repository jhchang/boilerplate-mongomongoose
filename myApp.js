require('dotenv').config();


// let Person;

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);

const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const justinChang = new Person({name: "Justin Chang", age: 10, favoriteFoods: ["cheese", "eggs", "bread"]});
  
  justinChang.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const arrPpl = [
  {name: "Justin Chang", age: 10, favoriteFoods: ["cheese", "eggs", "bread"]},
  {name: "Justin Chan", age: 9, favoriteFoods: ["cheese", "eggs"]},
  {name: "Justin Cha", age: 8, favoriteFoods: ["cheese"]}
];

const createManyPeople = (arrPpl, done) => {
  Person.create(arrPpl, (err, people) => {
    if (err) return console.error(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, personFound) => {
    if (err) return console.error(err);
    done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    
    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if (err) return console.error(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if (err) return console.error(err);
    done(null, updatedDoc);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedDoc) => {
    if (err) return console.error(err);
    done(null, removedDoc);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, (err, response) => {
    if(err) return console.log(err);
    done(null, response);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods: foodToSearch})
    .sort({name: 1})
    .limit(2)
    .select({age: 0})
    .exec((err, docs) => {
      if(err) return console.log(err);
      done(null, docs);
    });

};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
