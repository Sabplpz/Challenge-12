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

function viewEmployee() {
  db.query('SELECT * FROM employee', function (err, results) {
    console.log(results);
    mainMenu();
  });
}

function viewDepartment() {
  db.query('SELECT * FROM department', function (err, results) {
    console.log(results);
    mainMenu();
  });
}

function viewRole() {
  db.query('SELECT * FROM role', function (err, results) {
    console.log(results);
    mainMenu();
  });
}

function addDepartment() {
  inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: "What's the name of the new department?"
    }
  ])
  .then((answers) => {
    db.query(`INSERT INTO department (name) VALUES ("${answers.name}")`, function (err, results) {
      console.log("New department has been added!");
      mainMenu();
    });
  });
}

function mainMenu() {
  inquirer
  .prompt([
    {
      type: 'list',
      name: 'view',
      message: 'What do you want to view?',
      choices: ["Employee", "Role", "Department", "Add Department"],
    },
  ])
  .then(answers => {

    switch (answers.view) {
      case 'Employee':
        viewEmployee();
        break;
      case 'Role':
        viewRole();
        break;
      case 'Department':
        viewDepartment();
        break;
      case 'Add Department':
        addDepartment();
        break;
      case 'Add Role':
        addRole();
        break;
      case 'Add Employee':
        addEmployee();
        break;
      default:
        console.log('Oh oh! Choose again!');
    }
  });
};

mainMenu();