const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
//prompts.override(require('yargs').argv);

const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () =>
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is your project name?',
    },
    {
      type: 'input',
      name: 'installdirections',
      message: 'Install Directions',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'How is the application used?',
    },
    {
      type: 'input',
      name: 'contributing',
      message: 'Contributor information or Contribution guidelines',
    },
    {
      type: 'list',
      name: 'license',
      message: 'Choose a license',
      choices: [
        'MIT',
        'Apache',
        'Eclipse',
        'Mozilla',
      ],
    },
    {
      type: 'input',
      name: 'tests',
      message: 'Tests Cases',
    },
    {
      type: 'input',
      name: 'linkedin',
      message: 'Enter your LinkedIn URL.',
    },

  ]);

function pickLicenseUrl(answer) {

  switch (answer.license) {
    case 'MIT':
      answer.license = "MIT: [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"
      break;
    case 'Apache':
      answer.license = "Apache: [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"
      break;
    case "Eclipse":
      answer.license = "Eclipse: [![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)"
      break;
    case "Mozilla":
      answer.license = "Mozilla: [![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)"
      break;
    default:
      console.log("Not listed");
  }
}

const generateREADME = (answers) => {
  var backTicks = "```";
  var readme = `# ${answers.title} !! ${answers.license}

## Description
${backTicks}
  Usage: ${answers.usage}

  Installation: ${answers.installdirections}
${backTicks}

# Table of Contents 
${backTicks}

${backTicks}

## Contributing/Contribution Guidelines 
${backTicks}
  ${answers.contributing}
${backTicks}

## Tests 
${backTicks}
  ${answers.tests}
${backTicks}

## My linkedIn URL 
${backTicks}
  ${answers.linkedin}
${backTicks}
`
  return readme;
}


promptUser()
  .then((answers) => {
    console.log('Answers from pormpt!!', answers)
    pickLicenseUrl(answers)

    console.log('Answers after pick lisence function!!', answers)

    writeFileAsync(`${answers.title}.md`, generateREADME(answers))
  })
  .then(() => {

    console.log('Successfully wrote your README.md')
  })
  .catch((err) => console.error(err));
