#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const readline = require('readline');

let rl;
let type = process.argv[2];
let name = process.argv[3];
let directory = process.argv[4] || '.';

const htmlTemplate = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Template</title>
  </head>
  <body>
    <h1>Hello</h1>
    <p>CLI</p>
  </body>
</html>
`;

const routerTemplate = `
const express = require('express');
const router = express.Router();
 
router.get('/', (req, res, next) => {
   try {
     res.send('ok');
   } catch (error) {
     console.error(error);
     next(error);
   }
});
 
module.exports = router;
`;

const exist = (dir) => { // check file exisitng
  try {
    fs.accessSync(dir, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
    return true;
  } catch (e) {
    return false;
  }
};

const mkdirp = (dir) => { // creat path
  const dirname = path
    .relative('.', path.normalize(dir))
    .split(path.sep)
    .filter(p => !!p);
  dirname.forEach((d, idx) => {
    const pathBuilder = dirname.slice(0, idx + 1).join(path.sep);
    if (!exist(pathBuilder)) {
      fs.mkdirSync(pathBuilder);
    }
  });
};

const makeTemplate = () => { // Template creation
  mkdirp(directory);
  if (type === 'html') {
    const pathToFile = path.join(directory, `${name}.html`);
    if (exist(pathToFile)) {
      console.error('This file is already present.');
    } else {
      fs.writeFileSync(pathToFile, htmlTemplate);
      console.log(pathToFile, 'Complete creation');
    }
  } else if (type === 'express-router') {
    const pathToFile = path.join(directory, `${name}.js`);
    if (exist(pathToFile)) {
      console.error('This file is already present.');
    } else {
      fs.writeFileSync(pathToFile, routerTemplate);
      console.log(pathToFile, 'Complete creation');
    }
  } else {
    console.error('Input html or express-router.');
  }
};

const dirAnswer = (answer) => { // Set path
  directory = (answer && answer.trim()) || '.';
  rl.close();
  makeTemplate();
};

const nameAnswer = (answer) => {
    if (!answer || !answer.trim()) {
        console.clear();
        console.log('Input name please.');
        return rl.question('Create a name of file.', nameAnswer);
    }
    
    name = answer;
    return rl.question('Set the path for the store (if not, a current path will be saved) ', dirAnswer);
};

const typeAnswer = (answer) => {
    if (answer !== 'html' && answer !== 'express-router') {
        console.clear();
        console.log('Only provide html or express-router.');
        return rl.question('Which template do you want? ', typeAnswer);
    }
    
    type = answer;
    return rl.question('Create a name of file. ', nameAnswer);
};


const program = () => {
    if (!type || !name) {
        rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        console.clear();
        rl.question('Which template do you want?', typeAnswer);
    } else {
        makeTemplate();
    }

};

program();