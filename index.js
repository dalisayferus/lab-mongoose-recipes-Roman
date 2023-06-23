const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

let newRecipe = {
  title: "Smoothie",
  level: "Easy Peasy",
  ingredients: ["apple", "banana", "strawberry", "jogurt", "corn flakes"],
  cuisine: "Worldwide",
  dishType: "snack",
  image:
    "https://www.evolvingtable.com/wp-content/uploads/2022/12/How-to-Make-Smoothie-1.jpg",
  duration: 5,
  creator: "Gym People",
};

mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany();
  })
  .then(() => {
    return Recipe.create(newRecipe);
  })
  .then((result) => {
    console.log(`New Recipe added: ${result.title}`);
  })
  .then((result) => {
    return Recipe.insertMany(data);
  })
  .then(() => {
    const filter = { title: "Rigatoni alla Genovese" };
    const update = { duration: 100 };

    return Recipe.findOneAndUpdate(filter, update);
  })
  .then(() => {
    console.log(`The recipe Carrot Cake is updated`);
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((result) => {
    console.log(`${result.title} recipe was deleted`);
    return mongoose.connection.close();
  })
  .then(() => console.log(`connection closed`))
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

module.exports = newRecipe;
