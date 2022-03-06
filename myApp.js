require('dotenv').config();

//Install and Set Up Mongoose

let uri = 'mongodb+srv://user1:'+ process.env.MONGO_URI +'@freecodecamp.h8gdg.mongodb.net/db1?retryWrites=true&w=majority'
let mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//console.log(process.env.MONGO_URI)


//Create a Model
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});
const Person = mongoose.model("Person", personSchema);

let suhi = new Person({name: 'Suhi', age: '25', favoriteFoods: ['Chicken','Chips']})
console.log(suhi)

//

const createAndSavePerson = (done) => {

  let anna = new Person({
    name: 'Anna', age: '23', favoriteFoods: ['Noodles', 'Ice-cream']
  })

  anna.save((error, data)=>{
    if(error){
      console.log(error)
    }
    else{
      done(null, data)
    }
  })
  //done(null /*, data*/);
};

//Create Many Records with model.create()


const createManyPeople = function(arrayOfPeople, done) {
   Person.create(arrayOfPeople, (error, createdPeople)=> {
    if(error){
      console.log(error)
    }
    else{
      done(null,createdPeople);
    }
  });
};

//Use model.find() to Search Your Database

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (error, arrayOfResults)=>{
    if(error){
      console.log(error)
    }else{
      done(null, arrayOfResults)
    }
  })
};
//Use model.findOne() to Return a Single Matching Document from Your Database

const findOneByFood = (food, done) => {
 Person.findOne({favoriteFoods: {$all: [food]}},(error,result)=>{
   if(error){
     console.log(error)
   }else{
     done(null, result)
   }
 })
};
//Use model.findById() to Search Your Database By _id

const findPersonById = (personId, done) => {
  Person.findById(personId,(error, result)=>{
    if(error){
      console.log(error)
    }else{
      done(null, result)
    }
  })
};
//Perform Classic Updates by Running Find, Edit, then Save

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId,(error,result)=>{
    if(error){
      console.log(error)
    }else{
      result.favoriteFoods.push(foodToAdd)
      result.save((error,updatedResult)=>{
        if(error){
          console.log(error)
        }else{
          done(null, updatedResult)
        }
      })
    }
});
};
//Perform New Updates on a Document Using model.findOneAndUpdate()

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName},{age: ageToSet},{new:true},(error, updatedRecord)=>{
       if(error){
          console.log(error)
        }else{
          done(null, updatedRecord)
        }
    })
};

//Delete One Document Using model.findByIdAndRemove

const removeById = (personId, done) => {
 Person.findByIdAndRemove(personId, (error, deletedRecord)=>{
   if(error){
     console.log(error)
   }else{
     done(null, deletedRecord)
   }
 })
};
//Delete Many Documents with model.remove()

const removeManyPeople = (done) => {
  const nameToRemove = {name: "Mary"};

  Person.bulkWrite({name: nameToRemove}, (err, response) => {
    if(err) return console.log(err);
    done(null, response);
  })
};

//Chain Search Query Helpers to Narrow Search Results
const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: {$all: [foodToSearch]} })
  .sort({ name: 'asc' })
  .limit(2)
  .select('-age')
  .exec(function(error, filteredResult) {
     if(error){
     console.log(error)
   }else{
     done(null, filteredResult)
   }
 })
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
