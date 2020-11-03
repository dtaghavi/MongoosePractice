const mongoose = require("mongoose");

//Opens connection to database
mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified!"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

//Creating a relation of the schema to the collection. TERM: Fruit is now called a Model
const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  rating: 10,
  review: "Peaches are so yummy!"
});

//fruit.save();

//Creates the Schema for what a Person's data will follow.
const personSchema = new mongoose.Schema({
  name: String,
  age: Number
});

//Creating a relation of the schema to the collection. TERM: Person is now called a Model
const Person = mongoose.model("Person", personSchema);

//Constructing an actual instance of a Person
const person = new Person({
  name: "John",
  age: 37
});

//Write to DB
person.save();
//
// const kiwi = new Fruit({
//   name: "Kiwi",
//   score: 10,
//   review: "The best fruit"
// });
//
// const orange = new Fruit({
//   name: "Orange",
//   score: 4,
//   review: "Too sour for me."
// });
//
// const banana = new Fruit({
//   name: "Banana",
//   score: 3,
//   review: "Weird texture"
// });

//Adds multi use this vs fruit.save() for individual
//Params: 1) Array of the Models (Fruit) relative objects. 2) callback function with err
// Fruit.insertMany([kiwi, orange, banana], function (err) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log("Successfully saved all the fruits to fruitsDB");
//   }
// });

//DELETE ONE FUNCTION Params: 1) The condition to look for 2) Err Callback
// Fruit.deleteOne({name: "Peach"}, function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Document sucessfully deleted.");
//   }
// });

//DELETE MANY Params: 1) The condition to look for 2) Err Callback
// Person.deleteMany({ name: "John"}, function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("All documents sucessfully deleted.");
//   }
// });

Fruit.find(function(err, fruits) {
  if (err) {
    console.log(err);
  } else {

    //Close the connection once done with the DB
    mongoose.connection.close();

    fruits.forEach(function(fruit) {
      console.log(fruit.name);
    });
  }
});

//PARAMETERS: 1) the filter, which document am i updating? in this case where _id === "5fa0ded56371bd21674650f5" which we got from looking at the DB
// 2) What you want to update, in thise case the field name: to contain "Peach"
// 3) Callback function to handle and errors
// Fruit.updateOne({_id: "5fa0ded56371bd21674650f5"}, {name: "Peach"}, function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully updated document.");
//   }
// });
