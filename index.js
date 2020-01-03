const generateHTML = require("./generateHTML");
const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

const questions = [
  {
      type: "list",
      name: "color",
      message: "What is your favorite color?",
      choices: ["green", "blue", "pink", "red"]
  },
  {
      type: "input",
      name: "username",
      message: "What is your GitHub username?"
  }
];

function writeToFile(fileName, data) {
 
}

async function init() {
    try {
        const answers = await inquirer.prompt(questions);

        const queryURL = `https://api.github.com/users/${answers.username}/repos?per_page=10`;
        const githubResponse = await axios.get(queryURL);

        // console.log(githubResponse);

        const html = generateHTML(answers);
        console.log(html)

        await writeFileAsync("index.pdf", html);

    } catch(err) {
        console.log(err);
    }
}

init();
