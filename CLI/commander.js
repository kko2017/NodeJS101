#!/usr/bin/env node
const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { version } = require('./package.json');

const htmlTemplate = `
<!DOCTYPE html>
  <html>
  <head>
    <meta chart="utf-8" />
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

const exist = (dir) => {
  try {
    fs.accessSync(dir, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
    return true;
  } catch (e) {
    return false;
  }
};

const mkdirp = (dir) => {
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

const makeTemplate = (type, name, directory) => {
  mkdirp(directory);
  if (type === 'html') {
    const pathToFile = path.join(directory, `${name}.html`);
    if (exist(pathToFile)) {
      console.error(chalk.bold.red('This file is already present.'));
    } else {
      fs.writeFileSync(pathToFile, htmlTemplate);
      console.log(chalk.green(pathToFile, 'Complete creation'));
    }
  } else if (type === 'express-router') {
    const pathToFile = path.join(directory, `${name}.js`);
    if (exist(pathToFile)) {
      console.error(chalk.bold.red('This file is already present.'));
    } else {
      fs.writeFileSync(pathToFile, routerTemplate);
      console.log(chalk.green(pathToFile, 'Complete creation'));
    }
  } else {
    console.error(chalk.bold.red('html 또는 express-router 둘 중 하나를 입력하세요.'));
  }
};

// set program
program
    .version(version, '-v, --version') // cli -v
    .name('cli'); // cli -h   : h means help

program
    .command('template <type>') // < > means it is neccessary (i.e. cli template html)
    .usage('<type> --filename [filename] --path [path]')
    .description('create template.')
    .alias('tmpl') // cli tmpl thml
    .option('-f, --filename [filename]', 'Input a filename.', 'index')
    .option('-d, --directory [path]', 'Input a path.', '.')
    .action((type, options) => {
        console.log(type, options.filename, options.directory);
        makeTemplate(type, options.filename, options.directory);
    });

// when unregistered command is input by user. <ex> cli asdvvsad
program
    .command('*', { noHelp: true })
    .action(() => {
        console.log('Can\'t find this command.');
        program.help(); // cli -h
    });

// when inputting cli only. <ex> cli
program.action((cmd, argv) => {

});

program.parse(process.argv);