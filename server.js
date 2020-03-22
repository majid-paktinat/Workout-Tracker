const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/workout";

const Workout = require("./models/workout.js");
const Exercise = require("./models/exercise.js");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.post("/api/workouts", ({ body }, res) => {
  const workout = new Workout(body);

  Workout.create(workout)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// app.put("/api/workouts/?id", ({ body }, res) => {
//   const workout = new Exercise(body.query.id);
  
//   Workout.create(workout)
//     .then(dbWorkout => {
//       res.json(dbWorkout);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });


//  /api/workouts/range

// /stats

// /api/workouts (get)

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
