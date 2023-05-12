const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    console.log(`Connected to the business_db database.`)
  );

  

  inquirer
  .prompt([
    {
      type: 'list',
      name: 'view',
      message: 'What do you want to view?',
      choices: ["Employee", "Role", "Department"]
    },
  ])
  .then(answers => {

    switch (answers.view) {
      case 'Employee':
        db.query('SELECT * FROM employee', function (err, results) {
          console.log(results);
        });
        break;
      case 'Role':
        db.query('SELECT * FROM role', function (err, results) {
          console.log(results);
        });
        break;
      case 'Department':
        db.query('SELECT * FROM department', function (err, results) {
          console.log(results);
        });
        break;
      default:
        console.log('Oh oh! Choose again!');
    }
  })
  .prompt([
    {
      type: 'list',
      name: 'view',
      message: 'What do you want to view?',
      choices: ["Employee", "Role", "Department"]
    },
  ])
  


