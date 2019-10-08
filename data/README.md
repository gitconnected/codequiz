# Data for Code Quiz

The `index.json` file at the root describes all the categories available for quizzes. The `name` is how it will show up in the app, and the `key` maps to a folder containing quizzes.

Inside each category folder, there will also be an `index.json` file. It will describe the quizzes (title, description, difficulty, answer choices, correct answer). The quizzes themselves will live in subfolders and use the file format for the language they are describing.

Difficulty will go from 1 to 5
