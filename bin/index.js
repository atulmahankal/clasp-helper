#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');
const fs = require('fs');
// const { version } = require('os');

const pkgFile = path.join(__dirname, "../package.json")
const data = fs.readFileSync(pkgFile, "utf-8");
const pkg = JSON.parse(data);


program
  .name(pkg.name)
  .version(pkg.version)
  .description(pkg.description)
  // .argument('<name>', 'name')
  // .option("-g, --greeting <value>", "Create a file")
  .action(()=>{
    const figlet = require("figlet");
    console.log(figlet.textSync("clasp-helper"));
    console.log(pkg.name);
    console.log(pkg.version);
    console.log(pkg.description);
  });

program
  .command('create')
  .description('create a Google App Script project')
  .argument('<title>', 'The project title')
  .option('--type <type>', 'Creates a new Apps Script project attached to a new Document, Spreadsheet, Presentation, Form, or as a standalone script, web app, or API.')
  .option('--parentId <id>', 'A project parent Id.')
  .action(async (title, options) => {
    const {existsSync} = require('node:fs')
    
    // check app script already initialised
    const jsonFile = '.clasp.json';
    if (existsSync(`./${jsonFile}`)) {
      console.log(`Project file (${jsonFile}) already exists.`)
      process.exit(1);
    }

    // Create 'dist' directory
    const {createDirectory} = require('./fileSystem')
    await createDirectory('./dist');

//     const {createFile} = require('./fileSystem')
//     var containt = `**/**
// !appsscript.json
// !*.js
// !*.html
// `;
//     await createFile(`./dist/.claspignore`,containt);
    
    // create app script
    const {create} = require('./create');
    try {
      await create(title, options);
    } catch (error) {
      console.error(`${error.message}`);
    }
    
    // Move '.clasp.json' file to root
    if (existsSync(`./dist/${jsonFile}`)) {
      const {moveFileAsync} = require('./fileSystem')
      await moveFileAsync(`./dist/${jsonFile}`, `./${jsonFile}`);
    }
  });

  program
    .command('clone')
    .description('Clone a Google App Script project')
    .argument('<scriptId>')
    .action(async (scriptId)=>{
      const {existsSync} = require('node:fs')
      
      // check app script already initialised
      const jsonFile = '.clasp.json';
      if (existsSync(`./${jsonFile}`)) {
        console.log(`Project file (${jsonFile}) already exists.`)
        process.exit(1);
      }

      // Create 'dist' directory
      const {createDirectory} = require('./fileSystem')
      await createDirectory('./dist');
    
      // clone app script
      const {clone} = require('./clone');
      try {
        await clone(scriptId);
      } catch (error) {
        console.error(`${error.message}`);
      }
      
      // Move '.clasp.json' file to root
      if (existsSync(`./dist/${jsonFile}`)) {
        const {moveFileAsync} = require('./fileSystem')
        await moveFileAsync(`./dist/${jsonFile}`, `./${jsonFile}`);
      }
    });

program
  .command('reinitgit')
  .description('Reinitialise local git repository')
  .action( () => {
    console.log("this command currently not available.")
  });

// Handle the command
program.parse(process.argv);
