const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

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
    {//muilti select not workling
      type: 'multiselect',
      name: 'license',
      message: 'Choose a license',
      choices: [
        { title: 'MIT',  value: 'MIT' },
        { title: 'X11', value: 'X11' },
        { title: 'Expat', value: 'Expat' }
      ],
      initial: 1
    },
    {
      type: 'input',
      name: 'contributing',
      message: 'Contributor information or Contribution guidlines',
    },
    {
      type: 'input',
      name: 'tests',
      message: 'Tests Cases',
    },
    {
      type: 'input',
      name: 'questions',
      message: 'Enter your LinkedIn URL.',
    },
  ]);

const generateREADME = (answers) =>
`# ${answers.title} Repository !!

## Description 
${answers.description}

## Table of Contents 
${answers.TOC}

## Installation 
${answers.installation}

## Usage
${answers.usage}

## License
${answers.license}

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## Questions
${answers.questions}
`;


promptUser()
  .then((answers) => writeFileAsync(`${answers.title}.md`, generateREADME(answers)))
  .then(() => console.log('Successfully wrote your README.md'))
  .catch((err) => console.error(err));
