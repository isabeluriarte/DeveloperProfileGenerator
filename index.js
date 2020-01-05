const generateHTML = require("./generateHTML");
const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const util = require("util");
const pdf = require('html-pdf');


const writeFileAsyncHtml = util.promisify(fs.writeFile);

const writeFileAsync = (html) => {
    const options = { format: 'Letter' };

    pdf.create(html, options).toFile('./profile.pdf', function(err, res) {
        if (err) return console.log(err);
        console.log(res);
      });
} 

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
        

        const queryURL = `https://api.github.com/users/${answers.username}`;
        const githubResponse = await axios.get(queryURL)

        const user = {
            profileImage: githubResponse.data.avatar_url || null,
            username: githubResponse.data.login || null,
            name: githubResponse.data.name || null,
            company: githubResponse.data.company || null,
            location: githubResponse.data.location || null,
            gitProf: githubResponse.data.html_url || null,
            blog: githubResponse.data.blog || null,
            bio: githubResponse.data.bio || null,
            repos: githubResponse.data.public_repos || null,
            followers: githubResponse.data.followers || null,
            following: githubResponse.data.following || null,
            stars: githubResponse.data.starred_url || null
        }

        const html = generateHTML(answers, user);

        await writeFileAsyncHtml("index.html", html);
        await writeFileAsync(html);

    } catch(err) {
        console.log(err);
    }
}

init();
