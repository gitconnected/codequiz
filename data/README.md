# Data for Code Quiz

The `index.json` file at the root describes all the categories available for quizes. The `name` is how it will show up in the app, and the `key` maps to a folder containing quizzes.

Inside each category folder, there will also be an `index.json` file. It will describe the quizzes (title, description, difficulty, answer choices, correct answer). The quizzes themselves will live in subfolders and use the file format for the language they are describing.

Should difficulty be universal for all quizzes or allow categories to define their own range?
